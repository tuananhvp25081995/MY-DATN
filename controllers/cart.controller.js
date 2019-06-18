var db = require('../db');

module.exports.addToCart =  function(req, res, next){
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if(!sessionId){
    res.redirect('/products');
    return;
  }

  var count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();
      
  db.get('sessions')
  .find({id: sessionId})
  .set('cart.' + productId, count + 1)
  .write();

  res.redirect('/products');
};

module.exports.removeToCart =  function(req, res, next){
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if(!sessionId){
    res.redirect('/products');
    return;
  }

  var count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId)
    .value();
    const sessions = db.get('sessions').value()
    var x = sessions[0].cart
  db.get('sessions')
    .find({id: sessionId})
    .set('cart.' + productId, count - 1)
    .write();
    if(count === 1){delete x[productId]}

  res.redirect('/products/view/cart');
};
