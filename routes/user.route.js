var express = require('express');
var multer  = require('multer');
var controller = require('../controllers/user.controller');
var router = express.Router();
var upload = multer({ dest: './public/uploads/' });


router.get('/', controller.index);

router.get('/search',controller.search);

router.get('/create',controller.create);

router.get('/:id',controller.get);

router.post('/create',
upload.single('avatar'),
controller.createPost
);
 
module.exports = router;