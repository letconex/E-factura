const express = require('express');
const router = express.Router();
const Vendormodel = require('../public/javascripts/mongoose');

// Show generate vendor/customer form
router.get('/', async (req, res) => {
    res.render('generatevb', { title: 'Generare furnizor/client', message: 'Căutare după CUI în baza de date ANAF:' });
});

// Generate vendor/customer
router.post('/', async (req, res, next) => {
    try {
        let data = req.body
        console.log('taxdata from POST', data)
        const newvendor = new Vendormodel({ cui: data.cui, denumire: data.denumire, adresa: data.adresa, nrRegCom: data.nrRegCom });
        try {
            await newvendor.save()
            res.render('generatevb', { title: 'Creare furnizor/client', message: cui, taxdata: data })
        } catch (error) {
            if (error.code === 11000) {
                res.render('generatevb', { title: 'Creare furnizor/client', message: 'Firma există deja în baza de date', taxdata: data })
            } else {
                console.error(error)
                res.status(500).send('Eroare la salvarea în baza de date')
            }
        }
        res.render('generatevb', { title: 'Creare furnizor/client', message: cui, taxdata: data })
    } catch (error) {
        console.log(error)
        res.render('generatevb', { title: 'Creare furnizor/client', message: 'Eroare la apelarea serviciului ANAF! Încercați mai târziu sau introduceți datele manual.' });
    }
});

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

router.post('/test', function (req, res) {
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

module.exports = router;
