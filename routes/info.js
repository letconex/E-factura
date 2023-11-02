var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let codfiscal = "Aici va apărea codul fiscal căutat"
    res.render('info', { title: 'E-Factura', codfiscal: codfiscal });

});
router.get('/test/:cui', function (req, res, next) {
    let cui = req.params.cui
    let denumire = req.params.cui
    let adresa = req.params.cui
    let nrRegCom = req.params.cui
    let telefon = req.params.cui
    let codPostal = req.params.cui
    let cod_CAEN = req.params.cui
    let datefirma = {
        'codfiscal': cui,
        'denumire': denumire,
        'adresa': adresa,
        'nrRegCom': nrRegCom,
        'telefon': telefon,
        'codPostal': codPostal,
        'cod_CAEN': cod_CAEN,
    }
    console.log(datefirma, typeof(datefirma))
        //   res.send({ title: 'E-Factura', datefirma: JSON.stringify(datefirma[0]) })
          res.send({ title: 'E-Factura', datefirma: datefirma })
});

router.post('/', function (req, res) {
    let codfiscal = req.body.codfiscal
    console.log('Codfiscal from POST', codfiscal)
   atvaapi(codfiscal)
        .then(data => {
            res.render('info', { title: 'E-Factura', codfiscal: data })
        })
        .catch(error => {
            res.send(JSON.stringify(error))
        })
});

function savelocalstorage() {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let color = document.getElementById('color').value;
    let quantity = document.getElementById('quantity').value;
    price = price.replace(',', '.')

    let item = {
        'name': name,
        'price': parseFloat(price).toFixed(2),
        'color': color,
        'quantity': quantity
    }
    console.log(item);

    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    console.log(JSON.stringify(items))
    localStorage.setItem('items', JSON.stringify(items));

    // Display the items in the local storage
    displayItems();
}

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
        .catch((error) => console.error('Error:', error))
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

app.post('/', function(req, res) {
    if (req.body.vendor) {
       // Vendor form was submitted
       console.log('Vendor tax code:', req.body.vendor);
       res.send('Vendor form submitted successfully.');
    } else if (req.body.buyer) {
       // Buyer form was submitted
       console.log('Buyer tax code:', req.body.buyer);
       res.send('Buyer form submitted successfully.');
    } else {
       // Neither form was submitted
       res.send('Please submit either the vendor or buyer form.');
    }
   });

module.exports = router;
// Then create a route to render the info.pug file. If the view engine property is not set, you must specify the extension of the view file. Otherwise, you can omit it.
// fetch('https://api.example.com/data')
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Request failed with status code: ' + response.status);
//     }
//   })
//   .then(data => {
//     console.log(data); // Process the response data
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
