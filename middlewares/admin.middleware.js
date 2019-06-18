var Admin = require('../models/admin.model');

var db = require('../db')
module.exports.requireAuth = async function(req,res,next){
    if(!req.signedCookies.adminId){
        res.redirect('/admin/login');
        return;
    }
    var admin = await Admin.find({_id: req.signedCookies.adminId});
    if(!admin){
        res.redirect('/admin/login');
        return;
    }
    res.locals.admin = admin[0];
    next();
};