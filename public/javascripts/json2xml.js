// import { json2xml } from 'xml-js';
const xmljs = require('xml-js');

const jsonObj = {
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8"
        }
    },
    "valuewithattr": {
        "_attributes": {
            "version": "1.0",
            "encoding": "utf-8",
        }
    },
    "parent": {
        "son": "+",
        "daughter": "-",
    },
    name: 'Garage',
    cars: [
        { color: 'red', maxSpeed: 120, age: 2 },
        { color: 'blue', maxSpeed: 100, age: 3 },
        { color: 'green', maxSpeed: 130, age: { newage: 2 } },
    ],
};

const json = JSON.stringify(jsonObj);
const xml = xmljs.json2xml(json, { compact: true, ignoreComment: true, spaces: 2 });
console.log(xml);


const xmls =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    '    <title>Happy</title>' +
    '    <todo>Work</todo>' +
    '    <todo>Play</todo>' +
    '</note>';
// var result = xmljs.xml2json(xmls, { compact: true, spaces: 4 });
// console.log(result);

// var json = require('fs').readFileSync('test.json', 'utf8');
// var options = {compact: true, ignoreComment: true, spaces: 4};
// var result = convert.json2xml(json, options);

// This library provides 4 functions: js2xml(), json2xml(), xml2js(), and xml2json().
// Here are the usages for each one (see more details in the following sections):

// var convert = require('xml-js');
// result = convert.js2xml(js, options);     // to convert javascript object to xml text
// result = convert.json2xml(json, options); // to convert json text to xml text
// result = convert.xml2js(xml, options);    // to convert xml text to javascript object
// result = convert.xml2json(xml, options);  // to convert xml text to json text