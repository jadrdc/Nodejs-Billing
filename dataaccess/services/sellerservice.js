const http = require('http');
const request = require('sync-request');
const querystring = require("querystring");

const options = {
  host: 'facturacion-web-api-proyecto-final20170406122219.azurewebsites.net',
  path: '/api/sellerprofile',
  method: 'GET'
};

function Service() {
  this.getSellerByIdentification=function (req,done) {

  const promise =new Promise(function(resolve, reject) {
    options.path = '/api/sellerprofile?identification=' + req.query.user ;
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




    this.getSellerById = function(id, done) {
        const promise = new Promise(function(success, failure) {
            options.method = 'GET';
            options.path = '/api/sellerprofile?id=' + querystring.escape(id);

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
        promise.then(done).catch(function(e) {
            console.log(e);

        });

    }









    this.getSeller = function(username, password, next) {
        const promise = new Promise(function(success, failure) {
            options.method = 'GET';
            options.path = '/api/sellerprofile?username=' + querystring.escape(username) + '&password=' + querystring.escape(password);
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
        promise.then(function(user) {
            next(JSON.parse(user));
        }).catch(function(e) {
            console.log(e);

        });
    };






    this.updateSeller = function(req, resp) {

        const promise = new Promise(function(resolve, reject) {
            options.path = '/api/sellerprofile?id=' + req.body.id + '&name=' + querystring.escape(req.body.name) + '&lastname=' + querystring.escape(req.body.lastname) +
             '&username=' + querystring.escape(req.body.username)
            +    '&ident=' + querystring.escape(req.body.ident) + '&password=' + querystring.escape(req.body.password) + '&comission=' + querystring.escape(req.body.comission);
            options.method = 'PUT';

            console.log (options.path);
            http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(data) {
                    if (res.statusCode == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            }).end();
        });

        promise.then(function() {
            resp.redirect('/sellersdetails');

        }).catch(function(e) {
            console.log(e);
        });


    }


    this.deleteSeller = function(req) {
        const promise = new Promise(function(resolve, reject) {
            options.path = '/api/sellerprofile?id=' + req.body.id;
            options.method = 'DELETE';
            http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(data) {
                    if (res.statusCode == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            }).end();
        });
        promise.then().catch(function(e)
      {
        console.log(e);
      });
    }



    this.addSeller = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.method = 'POST';
            options.path = '/api/sellerprofile?name=' + querystring.escape(req.body.name) + '&lastname=' + querystring.escape(req.body.lastname) + '&ident=' +
                req.body.ident +
                '&username=' + querystring.escape(req.body.username) + '&password=' + req.body.password + '&commision=' + req.body.comission;
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
            resp.redirect('/sellersdetails');
        }).catch(function(e) {
            console.log(e);
        });
    }

    this.getSellers = function(resp) {
        const promise = new Promise(function(success, failure) {
            options.method = 'GET';
            var dataToSend = '';
            options.path='/api/sellerprofile';
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
            resp.render('seller/details', {
                sellers: JSON.parse(data)
            }).catch(function(e) {
                console.log(e);
            });
        });

    }

}
module.exports = Service;
