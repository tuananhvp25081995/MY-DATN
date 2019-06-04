var User = require('../models/user.model');

var md5 = require('md5');
var db = require('../db');

module.exports.index = async function(req,res){
    var users = await User.find();
    res.render('users/index',{
        users: users
    });
}

module.exports.search = async function(req,res){
    var users = await User.find();
    var q = req.query.q;
    var searchname = users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users:searchname
    });
}

module.exports.create = function(req,res){
    res.render('users/create');
}

module.exports.get = async function(req,res){
    var id = req.params.id;
    var users = await User.find({_id:id});

    users.forEach(function(user){
        res.render('users/view',{
            user: user
        });
    });
}

module.exports.createPost =  function(req,res){
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    req.body.password = md5(req.body.password);
    let users =  new User (req.body)
    var errors = [];
    if(!req.body.name){
        errors.push('Name is required')
    }
    if(!req.body.email){
        errors.push('email is required')
    }

    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        });
        return;
    }
    users.save((err,data) =>{
        if(err){
            res.send(err);
        }
        res.end(data);
    });
    res.redirect('/products')
}

module.exports.user = async function(req, res, next){
    var user = await User.find({_id: req.signedCookies.userId});
    res.locals.user = user[0];
    next();
}