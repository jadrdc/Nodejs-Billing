const router = require('express').Router();
var CustomerService = require('../dataaccess/services/customerservice');
var ArticleService = require('../dataaccess/services/articleservice');
var BillService = require('../dataaccess/services/billingservice');
const SellerService = require('../dataaccess/services/sellerservice');







router.get('/billing', function(req, resp) {
    if (req.user) {

        var service = new ArticleService();
        service.getArticleStoBill(req, resp);


    } else {
        resp.redirect("/login");
    }
});




router.get('/report', function(req, resp) {

    resp.render('billing/report');
});


router.get('/getreport', function(req, resp) {

  if (req.user) {
      const service = new BillService();
      service.getReportData(req, function(customer) {
          resp.send(customer);
      });
  }
                    }          );




            router.get('/billing', function(req, resp) {
                if (req.user) {

                    var service = new ArticleService();
                    service.getArticleStoBill(req, resp);


                } else {
                    resp.redirect("/login");
                }
            });



            router.get('/getCustomerToBilled', function(req, resp) {
                if (req.user) {
                    const service = new CustomerService();
                    service.getCustomerByIdentification(req, function(customer) {
                        resp.send(customer);
                    });
                }
            });

            router.post('/bill', function(req, resp) {
                if (req.user) {
                    var service = new BillService();
                    service.BillUser(req, resp);

                }
            });



            module.exports = router;
