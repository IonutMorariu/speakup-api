const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const flashcardSchema = new Schema({
	f_collection: {
		type: mongoose.Schema.ObjectId,
		ref: 'Collection',
		required: 'A collection is required'
	},
	front_text: {
		type: String,
		required: 'Front text is required'
	},
	back_text: {
		type: String,
		required: 'Back text is required'
	}
});

flashcardSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Flashcard', flashcardSchema);
