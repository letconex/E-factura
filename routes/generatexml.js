const express = require('express');
const router = express.Router();
const xmljs = require('xml-js');

/* GET home page. */
router.get('/', function (req, res, next) {
    let codfiscal = "Aici va apărea codul fiscal căutat"
    res.render('generatexml', { title: 'E-Factura', codfiscal: codfiscal });

});
router.post('/', function (req, res, next) {
    let codfiscal = req.body.codfiscal
    console.log('Codfiscal from POST', codfiscal)
          res.render('generatexml', { title: 'E-Factura', codfiscal: codfiscal })
});

router.post('/x', function (req, res) {
    let codfiscal = req.body.codfiscal
    console.log('Codfiscal from POST', codfiscal)
   atvaapi(codfiscal)
        .then(data => {
            res.render('index', { title: 'E-Factura', codfiscal: data })
        })
        .catch(error => {
            res.send(error)
        })
});

const jsonObj = {
  name: 'Garage',
  cars: [
    { color: 'red', maxSpeed: 120, age: 2 },
    { color: 'blue', maxSpeed: 100, age: 3 },
    { color: 'green', maxSpeed: 130, age: 2 },
  ],
};

// const json = JSON.stringify(jsonObj);
// const xml = xmljs.json2xml(json, { compact: true, ignoreComment: true, spaces: 2 });
// console.log(xml);
module.exports = router;
