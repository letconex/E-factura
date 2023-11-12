const express = require('express');
const router = express.Router();
// const connection = require('../app');
const {Vendormodel} = require('../public/javascripts/mongoose');
/* GET home page. */
router.get('/', async (req, res, next) => {
    let message = "Afișare furnizor/client"
    await Vendormodel.find({ '__v': 0 })
        .then(vendors => {
            console.log('Number of vendors', vendors.length)
            res.render('index', { title: 'Privire de ansamblu', message: message, vendordata: vendors })
        })
        .catch(err => {
            console.log('Error accessing vendors:', err)
            message = 'Eroare accesare bază de date'
            res.render('index', { title: 'Privire de ansamblu', message: message, vendordata: vendors })
        })
});
router.post('/', function (req, res, next) {
    let vendordata = req.body.vendordata
    console.log('vendordata from POST', vendordata)
    res.render('index', { title: 'Privire de ansamblu', vendordata: vendordata })
});

router.post('/x', function (req, res) {
    let vendordata = req.body.vendordata
    console.log('vendordata from POST', vendordata)
    atvaapi(vendordata)
        .then(data => {
            res.render('index', { title: 'Privire de ansamblu', vendordata: data })
        })
        .catch(error => {
            res.send(error)
        })
});

router.get("/vendors", async (request, response) => {
    const users = await userModel.find({});
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});
router.post("/add_user", async (request, response) => {
    const user = new userModel(request.body); // request in json format
    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});
module.exports = router;

// If the view engine property is not set, you must specify the extension of the view file. Otherwise, you can omit it.

