const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.Promise = global.Promise;

const messageSchema = new Schema({
	text: {
		type: String,
		required: 'A message is required'
	},
	sender: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	chat: {
		type: mongoose.Schema.ObjectId,
		ref: 'Chat'
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

messageSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Message', messageSchema);
