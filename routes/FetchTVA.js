const express = require('express');
const router = express.Router();
const app = require('../app');
const { Vendormodel } = require('../public/javascripts/mongoose');

router.post('/', async (req, res, next) => {
    try {
        let cui = req.body.lookupcui;
        let taxdata = await atvaapi(cui);
        console.log(JSON.stringify(taxdata));
        try {
            res.render('generatevb', { title: 'Căutare firmă', message: cui, taxdata: taxdata })
        } catch (error) {
            console.error(error)
            res.status(500).send(`Eroare la afișarea datelor TVA: ${error}`)
        }
    } catch (error) {
        console.log(error)
        res.render('generatevb', { title: 'Creare furnizor/client', message: 'Eroare la apelarea serviciului ANAF! Încercați mai târziu sau introduceți datele manual.' });
    }
});

// totalfirme(cui).then(data => res.render('fetchtva', { title: 'E-Factura', taxdata: data }))
//- input(type="text" id="cui" name="cui" value=codfiscal[0].cui title="Cod fiscal" required)

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
        .then(datarec => {
            console.log(datarec);
            return datarec;  // return the data instead of logging it
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

async function totalfirme(cui) {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.7,ro;q=0.3",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Alt-Used": "www.totalfirme.ro",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-GPC": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    }
    const data = `{ "query": ${cui} }`
    const url = "https://www.totalfirme.ro/firmelike"
    try {
        const response = await fetch(url, {
            "credentials": "include",
            "headers": headers,
            "referrer": "https://www.totalfirme.ro/",
            "body": data,
            "method": "POST",
            "mode": "cors"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        // console.log('TVA API Response:', result);
        return result;
    } catch (error) {
        console.log('There was a problem with the connection:', error);
    }
}
// totalfirme(19479100).then(data => console.log(data)) // if not logged inside function
// totalfirme(19479100) // if logged inside function

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
        // console.log('Async TVA API response:', JSON.stringify(result));
        return result;
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}
module.exports = router;
// function getCUI() {
//     let cuis = document.querySelectorAll('.cui');
//     for (let i = 0; i < cuis.length; i++) {
//         if (!cuis[i].classList.contains("loaded")) {
//             cuis[i].addEventListener('click', () => {
//                 tvaapi(cuis[i].innerText);
//                 cuis[i].classList.add("loaded");
//             });
//             break;
//         }
//     }
// }

// async function getData() {
//     let x = await tvaapi(19467555).then(response => {
//                 return response});
//     return response;
// }

// const loadPosts = async (cui) => {
//     const url = 'https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva';
//     const headers = {
//         'Accept': 'application/json',
//         'Accept-Language': 'en-US,en;q=0.7,ro;q=0.3',
//         'Connection': 'keep-alive',
//         'Referer': 'https://mfinante.gov.ro',
//         'Content-Type': 'application/json',
//     };
//     const today = new Date().toISOString().slice(0, 10);
//     const data = [{ 'cui': cui, 'data': today }];

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(data)
//     })
//     const resData = await response.json().then((data) => {
//         // the network request is completed
//         myApps = data;
//         // console.log(myApps);
//         return myApps;
//     });

// };


