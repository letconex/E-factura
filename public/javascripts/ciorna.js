You can use the 'module-alias' package to create aliases for directories and subdirectories in your Node.js project.

Here's how you can do it:

Install the 'module-alias' package by running the following command in your terminal:
bash
Copy code
npm install module-alias
In your main server file (e.g., app.js), add the following lines at the top of the file to create an alias for the 'public' directory:
javascript
Copy code
var moduleAlias = require('module-alias');
moduleAlias.addAliases({
    '#public': path.join(__dirname, 'public')
});
Now, you can include subdirectories to be accessible from all modules using the '#public' alias. For example, if you want to include the 'javascripts' subdirectory, you can use the following line of code:
javascript
Copy code
var myFile = require('#public/javascripts/file.js');
This approach allows you to create aliases for directories and subdirectories, making them accessible from all modules in your Node.js project.

router.post('/', async (req, res, next) => {
    try {
        let cui = req.body.lookupcui;
        let taxdata = await atvaapi(cui);
        // date_generale = taxdata.found[0].date_generale;
        console.log(JSON.stringify(taxdata));
        // const newvendor = new Vendormodel({
        //     cui: date_generale.cui,
        //     denumire: date_generale.denumire,
        //     adresa: date_generale.adresa,
        //     nrRegCom: date_generale.nrRegCom,
        //     telefon: date_generale.telefon
        // });
        console.log(newvendor);
        try {
            // await newvendor.save()
            res.render('fetchtva', { title: 'Căutare firmă', message: cui, taxdata: taxdata })
        } catch (error) {
            if (error.code === 11000) {
                res.render('fetchtva', { title: 'Căutare firmă', message: 'Firma există deja în baza de date', taxdata: taxdata })
            } else {
                console.error(error)
                res.status(500).send('Eroare la salvarea în baza de date')
            }
        }
        res.render('fetchtva', { title: 'Căutare firmă', message: cui, taxdata: taxdata })
    } catch (error) {
        console.log(error)
        res.render('generatevb', { title: 'Creare furnizor/client', message: 'Eroare la apelarea serviciului ANAF! Încercați mai târziu sau introduceți datele manual.' });
    }
});