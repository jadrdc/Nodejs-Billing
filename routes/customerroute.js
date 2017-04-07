const router = require('express').Router();
var CustomerService = require('../dataaccess/services/customerservice');

router.get('/addcustomer', function(req, resp) {
    if (req.user) {
        resp.render('customer/addcustomer');
    } else {
        resp.redirect("/login");
    }

});

router.get('/customer', function(req, resp) {

    if (req.user) {
        var service = new CustomerService();
        service.getCustomers(resp);
    } else {
        resp.redirect("/login");
    }

});


router.post('/addcustomer', function(req, resp) {
    /**/
    var service = new CustomerService();
    service.addCustomer(req, resp);
});


router.post('/updatecustomer', function(req, resp) {
    var service = new CustomerService();
    service.updateCustomer(req, resp);
});

router.post('/removecustomer', function(req, resp) {

    var service = new CustomerService();
    service.deleteCustomer(req);
});

module.exports = router;
