const express = require('express');
const router = express.Router();
const {vendorschema} = require('../public/javascripts/mongoose');

router.get("/", async (req, res) => {
    res.render('about', { title: 'Despre', message: 'Informații despre proiect', vendorschema: vendorschema });
});

module.exports = router;
