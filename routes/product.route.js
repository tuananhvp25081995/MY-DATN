var express = require('express');
var controller = require('../controllers/product.controller');
var router = express.Router();


router.get('/', controller.product);
router.get('/search',controller.search);
router.get('/view/cart',controller.viewCart);
router.post('/view/cart',controller.postViewCart);
router.get('/gioi-thieu-san-pham',controller.viewProduct);
router.get('/chia-se-nguoi-benh-1',controller.shareInfomation);
router.get('/chia-se-nguoi-benh-2',controller.shareInfomation);
router.get('/chia-se-nguoi-benh-3',controller.shareInfomation);
router.get('/lien-he',controller.contact);
router.get('/cam-nang/benh-ly-xuat-huyet-da-day',controller.camNang1)
router.get('/cam-nang/benh-ly-giam-tieu-cau',controller.camNang2);
router.get('/cam-nang/an-gi-kieng-gi',controller.camNang3);
router.get('/cam-nang/tin-suc-khoe',controller.camNang4);
router.get('/cam-nang/tu-van-san-pham',controller.camNang5)
router.get('/chi-tiet/:id',controller.chitiet);
router.get('/san-pham/dang-giam-gia',controller.giamGia);

module.exports = router;