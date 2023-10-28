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
        .then(response => response.text())
        .then(data => console.log(data))
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
atvaapi(19479100)

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
// getCUI();
// let x;
// tvaapi(19467555)
//     .then(response => {
//         x = response;
//         console.log(x);
//     })
//     .catch(error => console.error('Error:', error));

// async function getData() {
//     let x = await tvaapi(19467555).then(response => {
//                 return response});
//     return response;
// }
// yyy = getData();
// console.log(yyy)

// const getDatax = async () => {
//     let aaa = await getData();
//     return aaa
// }

// console.log(getDatax())

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

// let myApps

// loadPosts(18467555).then((data) => {
//     // the network request is completed
//     myApps = data;
//     //  console.log(myApps);
// }).catch((e) => {
//     // Network request has failed
//     console.log(e);
// })
// console.log(myApps)