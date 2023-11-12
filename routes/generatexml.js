const express = require('express');
const router = express.Router();
const xmljs = require('xml-js');

/* GET home page. */
router.get('/', function (req, res, next) {
    let taxdata = "Aici va apărea codul fiscal căutat"
    res.render('generatexml', { title: 'Generare factură XML',
    message: 'Selectați furnizorul sau clientul (dacă nu există, generați)',
    taxdata: taxdata });

});
router.post('/', function (req, res, next) {
    let taxdata = req.body.taxdata
    console.log('taxdata from POST', taxdata)
    res.render('generatexml', { title: 'E-Factura', taxdata: taxdata })
});

router.post('/x', function (req, res) {
    let taxdata = req.body.taxdata
    console.log('taxdata from POST', taxdata)
    atvaapi(taxdata)
        .then(data => {
            res.render('index', { title: 'E-Factura', taxdata: data })
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
