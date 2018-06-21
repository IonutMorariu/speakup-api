const mongoose = require('mongoose');

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
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
