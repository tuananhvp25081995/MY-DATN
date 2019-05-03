var express = require('express');
var controller = require('../controllers/product.controller');
var router = express.Router();


router.get('/', controller.product);
router.get('/search',controller.search);
router.get('/view/cart',controller.viewCart);

module.exports = router;