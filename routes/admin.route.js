var express = require('express');
var multer  = require('multer');
var controller = require('../controllers/admin.controller');
var adminMiddleware = require('../middlewares/admin.middleware');
var router = express.Router();
var upload = multer({ dest: './public/uploads/admins' });
var uploads = multer({ dest: './public/uploads/products' });

router.get('/',adminMiddleware.requireAuth,controller.index);

router.get('/blank',controller.blank);

router.get('/charts',controller.charts);

router.get('/forgot-password',controller.forgotPassword);

router.get('/login',controller.login);

router.post('/login',controller.postLogin);

router.get('/logout',controller.logOut);

router.get('/register',controller.register);

router.post('/register',
upload.single('avatar'),
controller.createPost
);

router.get('/hoa-don',controller.hoadon);

router.get('/products',controller.tables);

router.get('/product/create',controller.create);

router.post('/product/create',
uploads.single('image'),
controller.createProduct);

router.get('/product/edit/:productId',controller.editProduct);

router.get('/product/delete/:productId',controller.deleteProduct);

router.post('/product/edit/:productId',
uploads.single('image'),
controller.editProducts);

router.get('/paid-bill/:hoadonId',controller.paidBill);

router.get('/paid-bill/',controller.paidBills);
router.get('/sale/',controller.saleOff);
router.get('/sale/create',controller.viewSaleOff);
router.post('/sale/create',controller.createSaleOff);

router.get('/sale/edit/:saleId',controller.editSale);
router.post('/sale/edit/:saleId',controller.editSales);
router.get('/sale/:saleId',controller.updateSale);
router.get('/users/',controller.user);
router.get('/user/:id',controller.viewUser);
router.get('/user/delete/:userId',controller.deleteUser);
module.exports = router;