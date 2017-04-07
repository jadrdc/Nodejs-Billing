const http = require('http');
const querystring = require("querystring");
const Promise = require('promise');
const request = require('request');

function Service() {
  var options = {
          host: 'facturacion-web-api-proyecto-final20170406122219.azurewebsites.net',
          path: '/api/billing',
          method: 'GET'
      };


    this.getReportData=function (req,done) {

    const promise =new Promise(function(resolve, reject) {
      options.path = '/api/billing?identification=' + req.query.id +"&entity="+req.query.entity;
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


this.BillUser = function(req, resp) {
        const promise = new Promise(function(success, failure) {
            options.path = '/api/billing?customer=' + querystring.escape(req.body.customerid) + '&seller=' + req.user.id+
            "&articles="+(req.body.id);
            options.method = 'POST';
            console.log(options.path);
            http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(data) {
                    if (res.statusCode == 200) {

                        success(data);
                    } else {
                        failure();
                    }
                });

            }).end();
        });
        promise.then(function(datat) {
            resp.render('billing/authorization',{data : datat });
        }).catch(function(e)
      {
        console.log(e);
      });
    }


}


module.exports = Service;
