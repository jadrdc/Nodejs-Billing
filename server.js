const express = require('express');
const parameters = require('./config/parameter');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const articlesrouting = require('./routes/articleroutes');
const customerrouting = require('./routes/customerroute');
const sellerrouting = require('./routes/sellerroute');
const adminrouting = require('./routes/adminroutes');
const billingroute = require('./routes/billingroute');

const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const ejsmate = require('ejs-mate');
const MongoStore=require('connect-mongo')(session);


const app = new express();



app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookie());
app.use(session({

  secret:parameters.secret,
  resave:true,
  saveUnitialized:true
  ,store:new MongoStore({url:parameters.database,autoReconnect:true})
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use(articlesrouting);
app.use(customerrouting);
app.use(sellerrouting);
app.use(adminrouting);
app.use(billingroute);

app.use(express.static(__dirname + '/static'));
/*
parameters.mongoose.connect(parameters.database,function(err)
{
  if(err) {
  console.log('Unable to Connect due to '+err)
  }
  else {

    console.log('Connected')
  }
});
*/

app.listen(parameters.port, function(req, resp) {

    console.log('Hello World');
});
