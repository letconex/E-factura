var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let codfiscal = "Aici va apărea codul fiscal căutat"
    res.render('index', { title: 'E-Factura', codfiscal: codfiscal });

});
router.post('/x', function (req, res, next) {
    let codfiscal = req.body.codfiscal
    console.log('Codfiscal from POST', codfiscal)
          res.render('index', { title: 'E-Factura', codfiscal: codfiscal })
});

router.post('/', function (req, res) {
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

function tvaapi(cui) {
    const url = 'https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva';
    const headers = {
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.7,ro;q=0.3',
        'Connection': 'keep-alive',
        'Referer': 'https://mfinante.gov.ro',
        'Content-Type': 'application/json',
    };
    const today = new Date().toISOString().slice(0, 10);
    const data = [{ 'cui': cui, 'data': today }];

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        // .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
}
async function atvaapi(cui) {
    const url = 'https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva';
    const headers = {
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.7,ro;q=0.3',
        'Connection': 'keep-alive',
        'Referer': 'https://mfinante.gov.ro',
        'Content-Type': 'application/json',
    };
    const today = new Date().toISOString().slice(0, 10);
    const data = [{ 'cui': cui, 'data': today }];

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('TVA API Response:', result);
        return result;
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}
module.exports = router;
// Then create a route to render the index.pug file. If the view engine property is not set, you must specify the extension of the view file. Otherwise, you can omit it.

