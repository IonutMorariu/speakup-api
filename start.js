const mongoose = require('mongoose');

require('dotenv').config({ path: './variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', err => {
	console.log(err.message);
});

const app = require('./app');

//Set applications port to the env variable for prod and a number for local
app.set('port', process.env.PORT || 3000);

//run server
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
