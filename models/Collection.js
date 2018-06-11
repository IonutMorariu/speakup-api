const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
mongoose.Promise = global.Promise;

const collectionSchema = new Schema({
	name: {
		type: String,
		required: 'You must supply a name'
	}
});

collectionSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Collection', collectionSchema);
