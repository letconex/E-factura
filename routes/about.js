var express = require('express');
var router = express.Router();

// res.send('Get req to root');
router.get('/', function (req, res, next) {
    res.render('about', { title: 'E-Factura'});
});

module.exports = router;
