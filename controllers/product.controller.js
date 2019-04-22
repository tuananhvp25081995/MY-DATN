var Product = require('../models/product.model');

module.exports.product = async function(req,res){
//     var page = parseInt(req.query.page) || 1;
//     var perPage = 8;
//     var drop = (page - 1 ) * perPage;
    var sessionId = req.signedCookies.sessionId;
    var count = sumSalaries(db.get('sessions').find({ id: sessionId }).value().cart);
//     res.render('products/index',{
//         products: db.get('products').drop(drop).take(perPage).value(),
//         count: count
//     });
// };

  var products = await Product.find();
    res.render('products/index',{
      products: products,
      count: count
    });
  };

function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}
