const mongoose = require('mongoose');
const https = require('https');

require('dotenv').config({ path: './variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
	console.log(err.message);
});

//importing the models
require('./models/User');

const app = require('./app');

//Set applications port to the env variable for prod and a number for local
app.set('port', process.env.PORT || 3000);

//run server
app.listen(app.get('port'));

https.createServer(app.options, app).listen(app.get('port'));
