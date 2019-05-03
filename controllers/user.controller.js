var md5 = require('md5');
var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req,res){
    res.render('users/index',{
        users: db.get('users').value()
    });
}

module.exports.search = function(req,res){
    var q = req.query.q;
    var searchname = db.get('users').value().filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users:searchname
    });
}

module.exports.create = function(req,res){
    res.render('users/create');
}

module.exports.get = function(req,res){
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('users/view',{
        user: user
    });
}

module.exports.createPost = function(req,res){
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    var errors = [];
    if(!req.body.name){
        errors.push('Name is required')
    }
    if(!req.body.email){
        errors.push('Phone is required')
    }

    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values: req.body
        });
        return;
    }
    req.body.password = md5(req.body.password);
    db.get('users').push(req.body).write();
    res.redirect('/products')
}