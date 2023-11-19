const express = require('express');
const router = express.Router();
// const connection = require('../app');
const { Vendormodel } = require('../public/javascripts/mongoose');
/* GET home page. */
router.get('/', async (req, res) => {
    try {
        let message = "Afișare furnizor/client"
        vendordata = await Vendormodel.find({ '__v': 0 })
        console.log('Number of vendors', vendordata)
        res.render('index.pug', { title: 'Privire de ansamblu', message: message, vendordata: vendordata })
    } catch (error) {
        console.log('Error accessing vendors:', error)
        message = 'Eroare accesare bază de date'
        res.render('index', { title: 'Privire de ansamblu', message: message })
    }
});

// Assuming Vendormodel is the Mongoose model for your vendor/customer collection
router.delete('/deleteallvb', async (req, res) => {
    try {
        // This will delete all documents in the collection
        await Vendormodel.deleteMany({});
        res.status(200).send('All vendors/customers have been deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error deleting vendors/customers: ${error}`);
    }
});

router.delete('/deletevb/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteid = await Vendormodel.findOneAndDelete({ _id: id });
        console.log('Deleted ID:', deleteid._id)
        res.status(200).send('OK')
    } catch (error) {
        console.error(error);
    }
});

router.delete('/deletevbjson/:id', async (req, res) => {
    try {
        const message = "Furnizor/client șters"
        const id = req.params.id;
        const deleteid = await Vendormodel.findOneAndDelete({ _id: id });
        console.log('Number of vendors after delete', vendordata.length, 'Deleted ID', deleteid._id)
        // const vendordata = await Vendormodel.find({ '__v': 0 })
        // console.log('Number of vendors after delete', vendordata.length, 'Deleted ID', deleteid._id)
        // After deletion, you can redirect or send a success response
        // res.redirect('/'); // Redirect to the home page
        // res.render('index', { title: 'Privire de ansamblu', message: message, vendordata: vendordatax })
        // res.status(200).send({ message: 'Vendor deleted successfully' }); // Send a success response
        res.status(200).json({ message: message }); // Send a success response with a message
    } catch (error) {
        console.error(error);
        res.status(500).render('index', ({ message: `Eroare la ștergerea furnizorului: ${error}` }));
    }
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

async function showall(req, res, next) {
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
    next()
};

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

