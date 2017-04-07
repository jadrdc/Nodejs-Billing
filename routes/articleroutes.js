const router = require('express').Router();

var ArticleService = require('../dataaccess/services/articleservice');

router.get('/addArticle', function(req, resp) {
    if (req.user) {

        resp.render('articles/addarticles');

    } else {
        resp.redirect("/login");
    }
});


router.post('/addArticle', function(req, resp) {
    var service = new ArticleService();
    service.addArticle(req, resp);
});

router.get('/details', function(req, resp) {
  console.log ('Im In');

    if (req.user) {

        var service = new ArticleService();
        service.getArticleS(req, resp);

    } else {
        resp.redirect("/login");
    }



});


router.post('/removeArticle', function(req, resp) {
    var service = new ArticleService();
    service.deleteArticle(req);
});




router.post('/updateArticle', function(req, resp) {
    var service = new ArticleService();
    service.updateArticle(req, resp);
});




module.exports = router;
