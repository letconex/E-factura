const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
global.credentials = "Proiect realizat în cadrul programului GeneratiaTech 2023"
global.mongouri = "mongodb://127.0.0.1:27017/e-factura?tls=false"
mongoose.connect(mongouri);
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("Connected to MongoDB:", mongouri);
})
    .on('error', (err) => {
        console.warn(err);
    });

const indexRouter = require('./routes/index');
const vbRouter = require('./routes/generatevb');
const xmlRouter = require('./routes/generatexml');
const aboutRouter = require('./routes/about');
const fetchRouter = require('./routes/fetchtva');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/javascripts')));
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/generatevb', vbRouter);
app.use('/generatexml', xmlRouter);
app.use('/about', aboutRouter);
app.use('/fetchtva', fetchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.set('port', process.env.PORT || 3000);
if (!module.parent) {
    app.listen(app.get('port'), '0.0.0.0');
    console.log(`Express started on port ${app.get('port')}`);
}

// Ascultă evenimentul de închidere a aplicației
process.on('SIGINT', () => {
    // Închide conexiunea MongoDB
    mongoose.connection.close(() => {
        console.log('Conexiunea MongoDB a fost închisă.');
        process.exit(0);
    });
});
module.exports = app;
module.exports = connection;

// var mongoose = require('mongoose'),
//     logger = require('../logger'),
//     config = require('../config');  

// mongoose.connection.on('connecting', function(){
//     logger.info("trying to establish a connection to mongo");
// });

// mongoose.connection.on('connected', function() {
//     logger.info("connection established successfully");
// });

// mongoose.connection.on('error', function(err) {
//     logger.error('connection to mongo failed ' + err);
// });

// mongoose.connection.on('disconnected', function() {
//     logger.log('mongo db connection closed');
// })

// var gracefulExit = function() {
//     db.close(function(){
//         logger.log("mongoose connection with db " + server + 'is closing');
//         process.exit(0);
//     });
// };

// process.on('SIGNT', gracefulExit).on('SIGTERM', gracefulExit);

// var db = mongoose.createConnection(config.get('DB_URL'));
// module.exports = db;