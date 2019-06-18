var express = require('express');
var multer  = require('multer');
var controller = require('../controllers/user.controller');
var router = express.Router();
var upload = multer({ dest: './public/uploads/users' });

router.get('/create',controller.create);

router.post('/create',
upload.single('avatar'),
controller.createPost
);
 
module.exports = router;