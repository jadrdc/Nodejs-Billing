const router = require('express').Router();
const http = require('http');
const SellerService = require('../dataaccess/services/sellerservice');

var options = {
    host: 'localhost',
    port: '57867',
    path: '/api/sellerprofile',
    method: 'GET'
};


router.post('/updatesellerInfo', function(req, resp) {
console.log(req.body+'UPDATE');
    var service = new SellerService();
    service.updateSeller(req, resp);

});


router.get('/addseller', function(req, resp) {
if(req.user)
{
  resp.render('seller/addseller');
} else {
     resp.redirect("/login");
 }

});

router.get('/sellersdetails', function(req, resp) {
  if(req.user)
  {
    var service = new SellerService();
    service.getSellers(resp);

     } else {
          resp.redirect("/login");
      }

});


router.post('/removeseller', function(req, resp) {
  console.log(req.body.id);

    var service = new SellerService();
    service.deleteSeller(req);

});


router.post('/addseller', function(req, resp) {
        var service = new SellerService();
        service.addSeller(req, resp);
    }

);
module.exports = router;
