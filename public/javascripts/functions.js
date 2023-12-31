function deleteVendor(vendorId) {
    if (confirm('Sunteți sigur că doriți să ștergeți acest furnizor?')) {
        fetch('/deletevb/' + vendorId, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                document.querySelector("#message").textContent = "Furnizor șters"
                document.querySelector(`#${vendorId}`).closest('tr').remove();
                // document.getElementById(vendorId).closest('tr').remove();
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

function deleteallVendors(vendorId) {
    if (confirm('Sunteți sigur că doriți să ștergeți toate înregistrările?\nAceastă operațiune nu poate fi revocată!')) {
        fetch('/deleteallvb/' + vendorId, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Optionally, remove the table rows from the DOM
                document.getElementsByTagName('tr').remove();
                window.location.reload()
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

function deleteVendorjson(vendorId) {
    if (confirm('Sunteți sigur că doriți să ștergeți acest furnizor?')) {
        fetch('/deletevb/' + vendorId, {
            method: 'DELETE',
        })
            .then(response => response.json()) // Assuming the server sends a JSON response
            .then(data => {
                console.log(data.message); // Log the success message
                document.querySelector("#message").textContent = data.message
                // Optionally, redirect or reload the page to see the changes
                // window.location.reload(); // Reload the current page
                window.location.href = '/'; // Redirect to the home page
                document.querySelector("#message").innerText = data.message
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

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

function displayItems() {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    let tabel = document.getElementById('producttable');
    tabel.innerHTML = '';
    let thead = document.createElement('thead');
    thead.innerHTML = '<tr><td>Produs</td><td>Preț</td><td>Culoare</td><td>Cantitate</td><td>Operațiuni</td></tr>'
    tabel.appendChild(thead)
    let sumafinala = 0
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let row = document.createElement('tr');
        let firstrow = '<td>' + item.name + '</td>'
        let secondrow = '<td>' + parseFloat(item.price).toFixed(2) + '</td>'
        let thirddrow = '<td>' + item.color + '</td>'
        let fourthrow = '<td name="cantitateprodus">' + item.quantity + '</td>'
        let modcant = '<input type="text" class="modificantitate"><button name="modcant">Modifică cantitatea</button>'
        let deletebutton = '<button name="delete">Șterge produsul</button>'
        let fifthrow = '<td>' + modcant + deletebutton + '</td>'
        row.innerHTML = firstrow + secondrow + thirddrow + fourthrow + fifthrow;
        tabel.appendChild(row);
        let sumarand = parseFloat(item.price) * parseInt(item.quantity)
        sumafinala += sumarand
        sumafinala = +sumafinala.toFixed(2)
    }
    let totalrow = document.createElement('tr');
    totalrow.className = 'total'     // totalrow.classList.add('total');
    // totalrow.setAttribute("colspan", document.getElementById('producttable').rows.length)
    totalrow.innerHTML = '<td colspan="' + document.getElementById('producttable').rows.length + '">Preț total: ' + sumafinala + '</td>'
    tabel.appendChild(totalrow);
    adddeletebuttons()
    let modbuttons = document.getElementsByName('modcant');
    for (let i = 0; i < modbuttons.length; i++) {
        modbuttons[i].addEventListener('click', function () {
            let items = JSON.parse(localStorage.getItem('items')) || [];
            let valoarecoloanamodificantitate = document.getElementsByClassName('modificantitate')[i];
            let tabel = document.getElementById('producttable');
            let rows = tabel.getElementsByTagName('tr')
            let activerow = rows[1]
            let coloanacantitate = activerow.cells['3']
            // valoarecurenta = coloanacantitate.textContent
            console.log(valoarecoloanamodificantitate.value, 'activerow:', activerow, coloanacantitate)
            coloanacantitate.textContent = valoarecoloanamodificantitate.value
            items[i].quantity = parseInt(valoarecoloanamodificantitate.value, 10)
            localStorage.setItem('items', JSON.stringify(items));
            console.log(valoarecoloanamodificantitate.value, activerow, coloanacantitate, parseInt(valoarecoloanamodificantitate.value, 10))
            displayItems();
        })
    }
}

function adddeletebuttons() {
    let deletebuttons = document.getElementsByName('delete');
    for (let i = 0; i < deletebuttons.length; i++) {
        deletebuttons[i].addEventListener('click', function () {
            let items = JSON.parse(localStorage.getItem('items')) || [];
            items.splice(i, 1);
            localStorage.setItem('items', JSON.stringify(items));
            let tabel = document.getElementById('producttable');
            let rows = document.getElementsByTagName('tr')
            console.log(rows[i].innerHTML)
            displayItems();
        })
    }
}