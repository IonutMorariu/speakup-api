const mongoose = require('mongoose');
const http = require('http');
const https = require('https');
const fs = require('fs');
const expressWs = require('express-ws');

require('dotenv').config({ path: './variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
	console.log(err.message);
});

//importing the models
require('./models/User');
require('./models/Collection');
require('./models/Flashcard');
require('./models/Chat');
require('./models/Message');

const app = require('./app');

if (process.env.NODE_ENV == 'production') {
	//ssl options
	const options = {
		cert: fs.readFileSync('./sslcert/fullchain.pem'),
		key: fs.readFileSync('./sslcert/privkey.pem')
	};
	const httpsServer = https.createServer(options, app);
	var websocketsafe = expressWs(app, httpsServer);

	httpsServer.listen(443);
}

const httpServer = http.createServer(app);
var websocket = expressWs(app, httpServer);

app.ws('/echo-test', function(ws, req) {
	ws.on('message', function(msg) {
		ws.send('Message received');
	});
	ws.on('open', function() {
		ws.send('opened');
	});
});

//run server
httpServer.listen(80);
