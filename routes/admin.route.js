var express = require('express');
var controller = require('../controllers/admin.controller');
var router = express.Router();

router.get('/',controller.index);

router.get('/blank',controller.blank);

router.get('/charts',controller.charts);

router.get('/forgot-password',controller.forgotPassword);

router.get('/login',controller.login);

router.get('/register',controller.register);

router.get('/tables',controller.tables);

module.exports = router;