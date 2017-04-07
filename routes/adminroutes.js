const router = require('express').Router();
const auth = require('../config/authentication/localstrategy');
const passport = require('passport');


router.get('/', function(req, resp) {
  resp.render('admin/login', {
        error: ""
    });
});

router.get('/login', function(req, resp) {
    resp.render('admin/login', {
        error: req.flash('error')
    });
});

router.get('/logout', function(req, resp) {

  req.logout();
  resp.redirect("/login");

});


router.post("/login", passport.authenticate('local-login', {
    successRedirect: "/details",
    failureRedirect: "/login",
    failureFlash: 'Usuario o Contraseña Invalido'
}));

module.exports = router;
