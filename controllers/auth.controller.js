var md5 = require('md5');
var db = require('../db');

module.exports.login = function(req,res){
    res.render('auth/login');
}
module.exports.postLogin = function(req,res){
    var email = req.body.email;
    var user = db.get('users').find({email: email}).value();

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
    if(user.password !== userPassword){
        res.render('auth/login',{
            errors:[
                'Wrong passwrod'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId', user.id,{
        signed: true
    });
    res.redirect('/products');
};
