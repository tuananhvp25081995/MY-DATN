var Product = require('../models/product.model');


module.exports.index = async function(req, res){
  Product
    .find({})
    .exec((err, products) => {
      Product.count((err, counts) => {
        if (err) return next(err);
        res.render('admin/index', {
          products,
          totalProduct: counts
        });
      });
    });
};

module.exports.blank = function(req, res){
  res.render('admin/blank');
};

module.exports.charts = function(req, res){
  res.render('admin/charts');
};

module.exports.forgotPassword = function(req, res){
  res.render('admin/forgot-password');
};

module.exports.login = function(req, res){
  res.render('admin/login');
};

module.exports.register = function(req, res){
  res.render('admin/register');
};

module.exports.tables = function(req, res){
  Product.find().then(function(products){
    res.render('admin/tables',{
      products: products
    });
  });
};