const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SellerService = require('../../dataaccess/services/sellerservice');

passport.serializeUser(function(user, done) {
    console.log( user);

  /*  console.log( typeof JSON.parse(user));

    console.log( typeof user);
*/
    done(null, user);
});



passport.deserializeUser(function(user, done) {
    const sellerservice = new SellerService();
    sellerservice.getSeller(user.username, user.password, function(userinfo, err) {

        done(err, userinfo);
    });


});

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {

        const sellerservice = new SellerService();
        sellerservice.getSeller(username, password, function(user, err) {

          if (user) {
                done(null, user);
            }
            if (err) {
                done(err);
            }

            if (user==undefined ) {
              done(null,false);
            }


        });
    }));


exports.isAuthenticaded = function(req, res, next) {
    if (req.isAuthenticaded()) {
        return next();
    } else {

        res.redirect("/");
        next();
    }

}
