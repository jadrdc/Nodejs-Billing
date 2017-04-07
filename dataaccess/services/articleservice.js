const http = require('http');
const querystring = require("querystring");
const Promise = require('promise');
const request = require('request');

function Service() {
  var options = {
    host: 'facturacion-web-api-proyecto-final20170406122219.azurewebsites.net',
              path: '/api/article',
    method: 'GET'
};




    this.updateArticle = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/article?id=' + req.body.id + '&description=' + querystring.escape(req.body.description) + '&price=' + req.body.price;
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
            resp.redirect('back');
        }).catch(function(e)
      {
        console.log(e);
      });
    }



    this.deleteArticle = function(req) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/article?id=' + req.body.id;
            options.method = 'DELETE';
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
        promise.then(function() {}).catch(function(e)
      {
        console.log(e);
      });
    }


    this.addArticle = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/article?description=' + querystring.escape(req.body.descrip) + '&price=' + req.body.price;
            options.method = 'POST';
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
            resp.redirect('/details');
        }).catch(function(e)
      {
        console.log(e);
      });
    }

    this.getArticleS = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.method = 'GET';
            options.path='/api/article'
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
            resp.render('articles/details', {
                articles: JSON.parse(data)
            }).catch(function(e)
          {
            console.log(e);
          });
        });
    }

        this.getArticleStoBill = function(req, resp) {
            const promise = new Promise(function(success, failure) {
                options.method = 'GET';
                options.path='/api/article'
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
                resp.render('billing/billing', {
                    articles: JSON.parse(data)
                }).catch(function(e)
              {
                console.log(e);
              });
            });
        }




}


module.exports = Service;
