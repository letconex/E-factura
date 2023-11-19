const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date_generale = new Schema({
    cui: { type: Number, required: true, unique: true },
    denumire: { type: String, required: true, unique: true },
    adresa: { type: String, required: true },
    nrRegCom: { type: String, required: true, unique: true },
    telefon: { type: String },
    fax: { type: String },
    codPostal: { type: Number },
    act: { type: String },
    stare_inregistrare: { type: String },
    data_inregistrare: { type: String },
    cod_CAEN: { type: String },
    iban: { type: String },
    statusRO_e_Factura: { type: Boolean },
    organFiscalCompetent: { type: String },
    forma_de_proprietate: { type: String },
    forma_organizare: { type: String },
    forma_juridica: { type: String }
}, { _id: false });

const inregistrare_scop_Tva = new Schema({
    scpTVA: { type: Boolean },
    perioade_TVA: [{
        data_inceput_ScpTVA: { type: Date },
        data_sfarsit_ScpTVA: { type: Date },
        data_anul_imp_ScpTVA: { type: Date },
        mesaj_ScpTVA: { type: String }
    }]
}, { _id: false });

const inregistrare_RTVAI = new Schema({
    dataInceputTvaInc: { type: Date },
    dataSfarsitTvaInc: { type: Date },
    dataActualizareTvaInc: { type: Date },
    dataPublicareTvaInc: { type: Date },
    tipActTvaInc: { type: String },
    statusTvaIncasare: { type: Boolean }
}, { _id: false });

const stare_inactiv = new Schema({
    dataInactivare: { type: String },
    dataReactivare: { type: String },
    dataPublicare: { type: String },
    dataRadiere: { type: String },
    statusInactivi: { type: Boolean }
}, { _id: false });

const inregistrare_SplitTVA = new Schema({
    dataInceputSplitTVA: { type: String },
    dataAnulareSplitTVA: { type: String },
    statusSplitTVA: { type: Boolean }
}, { _id: false });

const adresa_sediu_social = new Schema({
    sdenumire_Strada: { type: String },
    snumar_Strada: { type: Number },
    sdenumire_Localitate: { type: String },
    scod_Localitate: { type: Number },
    sdenumire_Judet: { type: String },
    scod_Judet: { type: Number },
    scod_JudetAuto: { type: String },
    stara: { type: String },
    sdetalii_Adresa: { type: String },
    scod_Postal: { type: Number }
}, { _id: false });

const adresa_domiciliu_fiscal = new Schema({
    ddenumire_Strada: { type: String },
    dnumar_Strada: { type: Number },
    ddenumire_Localitate: { type: String },
    dcod_Localitate: { type: Number },
    ddenumire_Judet: { type: String },
    dcod_Judet: { type: Number },
    dcod_JudetAuto: { type: String },
    dtara: { type: String },
    ddetalii_Adresa: { type: String },
    dcod_Postal: { type: Number }
}, { _id: false });

const extras = new Schema({
    contactperson: { type: String },
    email: { type: String },
    web: { type: String },
    comments: { type: String },
}, { _id: false });

const vendorschema = new Schema({
    date_generale: date_generale,
    inregistrare_scop_Tva: inregistrare_scop_Tva,
    inregistrare_RTVAI: inregistrare_RTVAI,
    stare_inactiv: stare_inactiv,
    inregistrare_SplitTVA: inregistrare_SplitTVA,
    adresa_sediu_social: adresa_sediu_social,
    adresa_domiciliu_fiscal: adresa_domiciliu_fiscal,
    extras: extras
}, {
    timestamps: true
});

const vendorschemaref = new Schema({
    date_generale: { type: Schema.ObjectId, ref: 'date_generale' },
    inregistrare_scop_Tva: { type: Schema.ObjectId, ref: 'inregistrare_scop_Tva' },
    inregistrare_RTVAI: { type: Schema.ObjectId, ref: 'inregistrare_RTVAI' },
    stare_inactiv: { type: Schema.ObjectId, ref: 'stare_inactiv' },
    inregistrare_SplitTVA: { type: Schema.ObjectId, ref: 'inregistrare_SplitTVA' },
    adresa_sediu_social: { type: Schema.ObjectId, ref: 'adresa_sediu_social' },
    adresa_domiciliu_fiscal: { type: Schema.ObjectId, ref: 'adresa_domiciliu_fiscal' }
}, {
    timestamps: true
});

const vendorschematype = new Schema({
    date_generale: { type: date_generale },
    inregistrare_scop_Tva: { type: inregistrare_scop_Tva },
    inregistrare_RTVAI: { type: inregistrare_RTVAI },
    stare_inactiv: { type: stare_inactiv },
    inregistrare_SplitTVA: { type: inregistrare_SplitTVA },
    adresa_sediu_social: { type: adresa_sediu_social },
    adresa_domiciliu_fiscal: { type: adresa_domiciliu_fiscal }
}, {
    timestamps: true
});

// {timestamps: true}
// createdAt: { type: Date, default: Date.now },
// updatedAt: { type: Date, default: Date.now }

// vendorschema.pre('save', function(next) {
//  this.updatedAt = Date.now();
//  next();
// vendorschema.post('save', function(next) {
//  this.updatedAt = Date.now();
//  next();

const Vendormodel = mongoose.model('Vendor', vendorschema);
// const newvendor = new Vendormodel({ cui: '1', denumire: 'Firma1', adresa: 'adresa1', nrRegCom: 'nrRegCom1', telefon: '0729947926' });
const newvendor = new Vendormodel({
    "date_generale": {
        "cui": 19467555,
        "data": "2023-10-27",
        "denumire": "LEON TIBERIU CRISTIAN PERSOANĂ FIZICĂ AUTORIZATĂ",
        "adresa": "JUD. BRAŞOV, MUN. SĂCELE, STR. VALEA CERNATULUI, NR.47",
        "nrRegCom": "F08/388/2003",
        "telefon": "0729947925",
        "fax": "",
        "codPostal": "505600",
        "act": "",
        "stare_inregistrare": "RELUARE ACTIVITATE din data 30.04.2013",
        "data_inregistrare": "2007-01-01",
        "cod_CAEN": "7430",
        "iban": "",
        "statusRO_e_Factura": false,
        "organFiscalCompetent": "Administraţia Judeţeană a Finanţelor Publice Braşov",
        "forma_de_proprietate": "",
        "forma_organizare": "",
        "forma_juridica": "",
    },
    "inregistrare_scop_Tva": {
        "scpTVA": false,
        "perioade_TVA": [{
            "data_inceput_ScpTVA": { type: Date },
            "data_sfarsit_ScpTVA": { type: Date },
            "data_anul_imp_ScpTVA": { type: Date },
            "mesaj_ScpTVA": { type: String }
        }]
    },
    "statusTvaIncasare": false,
    "statusInactivi": false,
    "statusSplitTVA": false,
    "email": "letconex@yahoo.de",
    "web": "www.traduceri.pluto.ro",
    "comments": "Traduceri",
});
// console.log(newvendor);
// const uri = 'mongodb://127.0.0.1:27017/e-factura?tls=false'
// mongoose.connect(uri);
// const connection = mongoose.connection;
// newvendor.save()
// .then((newvendor) => console.log('Successfully added vendor:', newvendor))
// .catch(err => console.log('Failed to add vendor: ', err))
// .finally(() => {
//   connection.close()
//   console.log('MongoDB connection closed')
// });

const mongouri = 'mongodb://127.0.0.1:27017/e-factura?tls=false'
// conmongodb(mongouri)
async function conmongodb(uri) {
    await mongoose.connect(uri)
        .then(() => console.log('MongoDB database connection established successfully'))
        .catch(err => console.log('Error connecting to database: ', err));
    const connection = mongoose.connection;
    await newvendor.save()
        .then((newvendor) => console.log('Successfully added vendor:', newvendor))
        .catch(err => console.log('Failed to add vendor: ', err))
        .finally(() => {
            connection.close()
            console.log('MongoDB connection closed')
        })
    // await Vendormodel.find({}, {'denumire': 1, '_id': 0 })
    await Vendormodel.find({ '__v': 0 })
        .then(vendors =>
            vendors.forEach(x => console.log(x)))
        // .then(vendors => {
        //   // outputArray = vendors.map(obj => ({ denumire: obj.denumire }))
        //   // outputArray = vendors.map(obj => obj.denumire)
        //   // console.log('Vendors', outputArray)
        //   console.log('Vendors', vendors)
        // })
        .catch(err => console.log('Failed to add vendor: ', err))
        .finally(() => {
            connection.close()
            console.log('MongoDB connection closed')
        })
}

async function findall(model) {
    await model.find({ '__v': 0 })
        .then(documents =>
            documents.forEach(x => console.log(x)))
        // .then(documents => {
        //   // outputArray = documents.map(obj => ({ denumire: obj.denumire }))
        //   // outputArray = documents.map(obj => obj.denumire)
        //   // console.log('Documents', outputArray)
        //   
        // })
        .catch(err => console.log('Failed to add vendor: ', err))
        .finally(() => {
            console.log('Documents', documents)
        })
}


// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');`
// In your case, the error is occurring because you are missing a pair of {} to wrap the body of your arrow function
// inside the .then() method. When an arrow function has no {} around its body,
// it implicitly returns the value of the expression. However, when an arrow function has {} around its body,
// it doesn't implicitly return a value.
// You need to use the return keyword to return a value.
// const uri = 'mongodb://127.0.0.1:27017/test'
// mongoose.connect(uri);
// const connection = mongoose.connection;
// connection.once("open", function() {
//  console.log("MongoDB database connection established successfully");
//  connection.close()
// });

// exports.Vendormodel = Vendormodel
// exports.vendorschema = vendorschema
module.exports = { Vendormodel, vendorschema };
// https://mongoosejs.com/docs/models.html#compiling
const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    houseNumber: String,
});

const ContactInfoSchema = mongoose.Schema({
    tel: [Number],
    email: [String],
    address: {
        type: AddressSchema,
        required: true,
    },
});

const CustomerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    company: String,
    connectInfo: ContactInfoSchema,
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

/*

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

// module.exports = mongoose.model("Vendor", vendorschema);
// factura/app.js
const User = require('./public/javascripts/user');

// Now you can use the User model in your Express routes, for example:

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


const stringornumbervalidator = function(value) {
 return typeof value === 'string' || typeof value === 'number';
};

const MySchema = new Schema({
 myField: {
  type: Schema.Types.Mixed,
  validate: {
   validator: stringornumbervalidator,
   message: 'Value should be either a string or a number'
  }
 }
});

const MyModel = mongoose.model('MyModel', MySchema);

// factura/public/javascripts/user.js

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, 
});

const anotherSchema = new Schema({
  // define your second schema here
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Another: mongoose.model('Another', anotherSchema)
};

// factura/app.js

const express = require('express');
const { User, Another } = require('./public/javascripts/user');

const app = express();

// Now you can use the User and Another models in your Express routes
app.get('/users', async (req, res) => {
  const users = await User.find();
  const anothers = await Another.find();
  res.json({ users, anothers });
});

For brevity, let's assume that all following code is within the conmongodb() function.
With Mongoose, everything is derived from a Schema. Let's get a reference to it and define our kittens.

const kittySchema = new mongoose.Schema({
 name: String
});

So far so good. We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.

const Kitten = mongoose.model('Kitten', kittySchema);

A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

Kittens can meow, so let's take a look at how to add "speak" functionality to our documents:

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function speak() {
 const greeting = this.name
  ? 'Meow name is ' + this.name
  : 'I don\'t have a name';
 console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);

Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:

const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

We have talking kittens! But we still haven't saved anything to MongoDB.
Each document can be saved to the database by calling its save method.
The first argument to the callback will be an error if any occurred.

await fluffy.save();
fluffy.speak();

Say time goes by and we want to display all the kittens we've seen.
We can access all of the kitten documents through our Kitten model.

const kittens = await Kitten.find();
console.log(kittens);

We just logged all of the kittens in our db to the console.
If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.

await Kitten.find({ name: /^fluff/ });

This performs a search for all documents with a name property that begins with "fluff" and returns the result as an array of kittens to the callback.
*/