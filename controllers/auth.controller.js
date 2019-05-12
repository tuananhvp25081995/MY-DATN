var User = require('../models/user.model');

var md5 = require('md5');
var db = require('../db');

module.exports.login = function(req,res){
    res.render('auth/login');
}

module.exports.logOut = function(req,res){
    res.clearCookie('userId');
    res.clearCookie('sessionId');
    res.redirect('/');
}

module.exports.postLogin = async function(req,res){
    var email = req.body.email;
    var user = await User.find({email: email});
    var users = user[0]
    if(!user){
        res.render('auth/login',{
            errors:[
                'User does not exits'
            ],
            values: req.body
        });
        return;
    }
    var userPassword = md5(req.body.password);
    if(users.password !== userPassword){
        res.render('auth/login',{
            errors:[
                'Wrong passwrod'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId', users._id,{
        signed: true
    });
    res.redirect('/products');
};
