const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.Promise = global.Promise;

const chatSchema = new Schema({
	user_1: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'A user is required'
	},
	user_2: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'A user is required'
	},
	messages: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Message'
		}
	]
});

chatSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Chat', chatSchema);
