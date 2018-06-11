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
require('./models/Collection');

const app = require('./app');

if (process.env.NODE_ENV == 'production') {
	//ssl options
	const options = {
		cert: fs.readFileSync('./sslcert/fullchain.pem'),
		key: fs.readFileSync('./sslcert/privkey.pem')
	};
	const httpsServer = https.createServer(options, app);
	httpsServer.listen(443);
}

const httpServer = http.createServer(app);

//run server
httpServer.listen(80);
