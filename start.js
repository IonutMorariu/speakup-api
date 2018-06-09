const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
const fs = require('fs');

require('dotenv').config({ path: './variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
	console.log(err.message);
});

//importing the models
require('./models/User');

const app = require('./app');

//ssl options
const options = {
	cert: fs.readFileSync('./sslcert/fullchain.pem'),
	key: fs.readFileSync('./sslcert/privkey.pem')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

//run server
httpServer.listen(8080);
httpsServer.listen(8443);
