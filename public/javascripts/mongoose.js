const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorschema = new Schema({
    cui: { type: Number, required: true, unique: true },
    denumire: { type: String, required: true, unique: true },
    adresa: { type: String, required: true, unique: true },
    nrRegCom: { type: String, required: true, unique: true },
});
// createdAt: {type: Date, default: Date.now}
const Vendormodel = mongoose.model('Vendor', vendorschema);
const newvendor = new Vendormodel({ cui: '1', denumire: 'Firma1', adresa: 'adresa1', nrRegCom: 'nrRegCom1' });
// console.log(newvendor);
// const uri = 'mongodb://127.0.0.1:27017/e-factura?tls=false'
// mongoose.connect(uri);
// const connection = mongoose.connection;
// newvendor.save()
    // .then((newvendor) => console.log('Successfully added vendor:', newvendor))
    // .catch(err => console.log('Failed to add vendor: ', err))
//  .finally(() => {
//     connection.close()
//     console.log('MongoDB connection closed')
//  });

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
        // .finally(() => {
        //     connection.close()
        //     console.log('MongoDB connection closed')
        // })
    // await Vendormodel.find({}, {'denumire': 1, '_id': 0 })
    await Vendormodel.find({'__v' : 0})
        .then(vendors =>
            vendors.forEach(x => console.log(x)))
        // .then(vendors => {
        //     // outputArray = vendors.map(obj => ({ denumire: obj.denumire }))
        //     // outputArray = vendors.map(obj => obj.denumire)
        //     // console.log('Vendors', outputArray)
        //     console.log('Vendors', vendors)
        // })
        .catch(err => console.log('Failed to add vendor: ', err))
        .finally(() => {
            connection.close()
            console.log('MongoDB connection closed')
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
//   console.log("MongoDB database connection established successfully");
//   connection.close()
// });

module.exports = Vendormodel;

/*
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