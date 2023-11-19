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

To define a new route to delete a vendor in the generatevb.js file, you can follow these steps:

    Import the necessary model at the top of the file if it's not already imported.
    Define a DELETE route that will handle the deletion of a vendor by its unique identifier (e.g., CUI).
    Use the Vendormodel to find and delete the vendor from the database.
    Send a response back to the client indicating the success or failure of the operation.

// DELETE vendor by CUI
router.delete('/vendor/:cui', async (req, res) => {
    try {
        const cui = req.params.cui;
        const result = await Vendormodel.findOneAndDelete({ cui: cui });
        if (result) {
            res.send({ message: 'Furnizorul a fost șters cu succes.' });
        } else {
            res.status(404).send({ message: 'Furnizorul nu a fost găsit.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Eroare la ștergerea furnizorului: ${error}` });
    }
});

To send a DELETE request from the front-end to the server, you can use JavaScript's Fetch API.
Here's an example of how you might implement this:
// Function to call the DELETE request
function deleteVendor(cui) {
    fetch(`/vendor/${cui}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      // Handle the response data, e.g., refresh the list of vendors or redirect
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }
  
  // Example usage:
  // deleteVendor('vendorCuiHere');

  <tr class="vendors">
  <td class="vendor">...</td>
  <!-- ... other cells ... -->
  <td class="vendor">
    <button onclick="deleteVendor('6549e08b1e4ece942bdf70d3', this)">Delete</button>
  </td>
</tr>

function deleteVendor(id, buttonElement) {
    fetch(`/vendor/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the table row from the DOM
      buttonElement.closest('tr').remove();
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      // Optionally refresh the table or display a success message
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

  router.delete('/vendor/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Vendormodel.findByIdAndDelete(id);
        if (result) {
            res.json({ message: 'Vendor deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Vendor not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error deleting vendor: ${error}` });
    }
});

<button class="deletebutton" onclick="deleteVendor('6549e08b1e4ece942bdf70d3')">Ștergere</button>
function deleteVendor(vendorId) {
    if (confirm('Sunteți sigur că doriți să ștergeți acest furnizor?')) {
      fetch('/vendors/' + vendorId, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Optionally, remove the table row from the DOM
        document.getElementById(vendorId).closest('tr').remove();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    }
  }
  
  router.delete('/vendors/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Vendormodel.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Vendor deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Vendor not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error deleting vendor: ${error}` });
    }
});

<button class="deletebutton" onclick="deleteVendor(this)">Ștergere</button>
function deleteVendor(buttonElement) {

    // Find the parent row (tr) of the button
  
    var parentRow = buttonElement.closest('tr');
  
  
    // Get the first cell (td) of the row and its text content, which is the ID
  
    var vendorId = parentRow.getElementsByTagName('td')[0].textContent;


    <div data-id="box1">Box 1</div>
    <span data-id="box2">Box 2</span>
    // ✅ Get the first element with data-id = `box1`
const el1 = document.querySelector('[data-id="box1"]');
console.log(el1); // 👉️ div

// ---------------------------------------------------

// ✅ Get the first element that has data-id attribute set
const el2 = document.querySelector('[data-id]');
console.log(el2); // 👉️ div

// ---------------------------------------------------

// ✅ Get all elements with data-id = `box1`
const elements = document.querySelectorAll('[data-id="box1"]');
console.log(elements); // 👉️ [div]

// ✅ Get all elements with `data-id` attribute
const elements1 = document.querySelectorAll('[data-id]');
console.log(elements1); // 👉️ [div, div]

// ✅ Get only DIV elements with `data-id` attribute
const elements2 = document.querySelectorAll('div[data-id]');
console.log(elements2); // 👉️ [div, div]


(async () => {
    try {
        const newvendor = new vendorModel(data);
        await newvendor.save();
        console.log('Successfully added vendor:', newvendor);

        // Replace the fields in the `update` object with the fields you want to update
        const update = {
            fieldToUpdate: newValue
        };

        // Define the options for the findOneAndUpdate() function
        const options = {
            new: true // To return the updated document
        };

        // Call the findOneAndUpdate() function
        const updatedVendor = await newvendor.findOneAndUpdate(update, options);
        console.log('Successfully updated vendor:', updatedVendor);
    } catch (err) {
        console.log('Failed to add/update vendor: ', err);
    } finally {
        connection.close();
        console.log('MongoDB connection closed');
    }
})();