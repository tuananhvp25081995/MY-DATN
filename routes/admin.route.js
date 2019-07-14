var express = require('express');
var multer  = require('multer');
var controller = require('../controllers/admin.controller');
var controllers = require('../controllers/thongke.controller');
var adminMiddleware = require('../middlewares/admin.middleware');
var router = express.Router();
var upload = multer({ dest: './public/uploads/admins' });
var uploads = multer({ dest: './public/uploads/products' });

router.get('/',adminMiddleware.requireAuth,controller.index);

router.get('/blank',controller.blank);

router.get('/charts',controller.charts);
router.get('/thong-ke/thang2',controller.charts2);
router.get('/thong-ke/thang3',controller.charts3);
router.get('/thong-ke/thang4',controller.charts4);
router.get('/thong-ke/thang5',controller.charts5);
router.get('/thong-ke/thang6',controller.charts6);
router.get('/thong-ke/thang7',controller.charts7);
router.get('/thong-ke/thang8',controller.charts8);
router.get('/thong-ke/thang9',controller.charts9);
router.get('/thong-ke/thang10',controller.charts10);
router.get('/thong-ke/thang11',controller.charts11);
router.get('/thong-ke/thang12',controller.charts12);

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

router.get('/giao-hang',controller.duyetHoaDons);
router.get('/giao-hang/:hoadonId',controller.duyetHoaDon);

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
router.get('/remove-paid-bill/:hoadonId',controller.removeHoaDon);
router.get('/delete-paid-bill/:hoadonId',controller.removepaidBills);
router.get('/paid-bill/',controller.paidBills);
router.get('/export-excel/:idHoaDon',controller.exportExcel);

router.get('/thong-ke/thang1',controllers.exportExcel1);
router.get('/thong-ke/thang-2',controllers.exportExcel2);
router.get('/thong-ke/thang-3',controllers.exportExcel3);


router.get('/sale/',controller.saleOff);
router.get('/sale/create',controller.viewSaleOff);
router.post('/sale/create',controller.createSaleOff);

router.get('/sale/edit/:saleId',controller.editSale);
router.post('/sale/edit/:saleId',controller.editSales);
router.get('/sale/:saleId',controller.updateSale);

router.get('/messages',controller.message);

router.get('/users/',controller.user);
router.get('/user/:id',controller.viewUser);
router.get('/user/delete/:userId',controller.deleteUser);
module.exports = router;