require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
var userRouter = require('./routes/user.route.js');
var authRoute = require('./routes/auth.route.js');
var productRoute = require('./routes/product.route.js');
var cartRoute = require('./routes/cart.route');
var apiProductRoute = require('./api/routes/product.route');
var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware.js');
var countProduct = require('./controllers/product.controller')
var countUser =require('./controllers/user.controller');
var adminRoute = require('./routes/admin.route');
var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(sessionMiddleware);
app.use(express.static('public'));
app.use(countUser.user)
app.use(countProduct.count)
app.use('/products',productRoute);
app.use('/',productRoute);
app.use('/users', authMiddleware.requireAuth,userRouter);
app.use('/auth',authRoute);
app.use('/cart', cartRoute);
app.use('/api/products',apiProductRoute);
app.use('/admin', adminRoute);

app.listen(port,function(){
    console.log('Server listening on port' + port);
})