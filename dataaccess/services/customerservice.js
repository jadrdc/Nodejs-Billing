const request = require('sync-request');
const http = require('http');
const querystring = require("querystring");

const options = {
  host: 'facturacion-web-api-proyecto-final20170406122219.azurewebsites.net',
  path: '/api/customerprofile',
  method: 'GET'
};
const Promise = require('promise');

function Service() {

this.getCustomerByIdentification=function (req,done) {

const promise =new Promise(function(resolve, reject) {
  options.path = '/api/customerprofile?identification=' + req.query.identification ;
  options.method = 'GET';
  console.log(options.path);
  var dataToSend = '';
  http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(data) {
        dataToSend += data;
      });
      res.on('end', function() {
          if (res.statusCode == 200) {
              resolve(JSON.parse(dataToSend));
          } else {
              reject();
          }
      });
  }).end();
});


promise.then(done).catch(function(e){
  console.log(e);
});





}

    this.updateCustomer = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/customerprofile?id=' + req.body.id + '&name=' + querystring.escape(req.body.name) + '&lastname=' + querystring.escape(req.body.lastname) +
            '&username=' + querystring.escape(req.body.username)+
                '&ident=' + req.body.ident + '&password=' + querystring.escape(req.body.password) + '&account=' + querystring.escape(req.body.account);
            options.method = 'PUT';
            http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(data) {
                    if (res.statusCode == 200) {
                        success();
                    } else {
                        failure();
                    }
                });
            }).end();


        });
        promise.then(function() {
            resp.redirect('/customer', 200, {});
        });
    }

    this.deleteCustomer = function(req) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/customerprofile?id=' + req.body.id;
            options.method = 'DELETE';
            http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(data) {});
                if (res.statusCode == 200) {
                    success();
                } else {
                    failure();
                }

            }).end();
        });
        promise.then(function() {
            console.log('success');
        });

    }
    this.getCustomers = function(resp) {
      const promise = new Promise(function(success, failure) {
          options.method = 'GET';
          options.path='/api/customerprofile'
          var dataToSend = '';

          http.request(options, function(res) {
              res.setEncoding('utf8');
              res.on('data', function(data) {
                  dataToSend += data;
              });
              res.on('end', function() {
                  if (res.statusCode == 200) {
                      success(dataToSend);
                  } else {
                      failure();
                  }
              });
          }).end();
      });
        promise.then(function(data) {

            resp.render('customer/details', {
                customers: JSON.parse(data)
            });
        });
    }

    this.addCustomer = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/customerprofile?name=' + querystring.escape(req.body.name) + '&lastname=' + querystring.escape(req.body.lastname) + '&ident=' +
                querystring.escape(req.body.ident) + '&username=' + querystring.escape(req.body.username) + '&password=' +
                querystring.escape(req.body.password) + '&account=' + querystring.escape(req.body.account);
            options.method = 'POST';
            http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function() {
                    if (res.statusCode == 200) {
                        success();
                    } else {
                        failure();
                    }
                });

            }).end();
        });
        promise.then(function() {
            resp.redirect('/customer');
        });
    }


}
module.exports = Service;
