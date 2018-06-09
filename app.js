const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
const expressValidator = require('express-validator');
const https = require('https');
const fs = require('fs');

const routes = require('./routes/index');

//create our express app
const app = express();

//ssl cert
const options = {
	cert: fs.readFileSync('./sslcert/fullchain.pem'),
	key: fs.readFileSync('./sslcert/privkey.pem')
};
//serves up static files from the public folder. Anything in public/ will just be served as is.
app.use(express.static(path.join(__dirname, 'public')));

//Take the raw request and converts it to JSON in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Bunch of methods for validating data. Heavily used for registering users
app.use(expressValidator());

app.use('/', routes);

module.exports = app;
