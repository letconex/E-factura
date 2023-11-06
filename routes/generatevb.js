const express = require('express');
const router = express.Router();

/* Generate vendor/customer */
router.get('/', function (req, res, next) {
    let credentials = "Proiect realizat în cadrul programului GeneratiaTech @2023"
    res.render('generatevb', { title: 'Creare furnizor/client' });

});
router.post('/', function (req, res, next) {
    let codfiscal = req.body.codfiscal
    console.log('Codfiscal from POST', codfiscal)
          res.render('generatevb', { title: 'E-Factura', codfiscal: codfiscal })
});

router.post('/test', function (req, res) {
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

// app.post('/', function(req, res) {
//     if (req.body.vendor) {
//        // Vendor form was submitted
//        console.log('Vendor tax code:', req.body.vendor);
//        res.send('Vendor form submitted successfully.');
//     } else if (req.body.buyer) {
//        // Buyer form was submitted
//        console.log('Buyer tax code:', req.body.buyer);
//        res.send('Buyer form submitted successfully.');
//     } else {
//        // Neither form was submitted
//        res.send('Please submit either the vendor or buyer form.');
//     }
//    });
module.exports = router;
// Then create a route to render the index.pug file. If the view engine property is not set, you must specify the extension of the view file. Otherwise, you can omit it.

