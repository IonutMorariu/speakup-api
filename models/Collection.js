const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.Promise = global.Promise;

const collectionSchema = new Schema({
	name: {
		type: String,
		required: 'You must supply a name'
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'You must supply an author'
	}
});

function autopopulate(next) {
	this.populate('author');
	next();
}

collectionSchema.pre('find', autopopulate);
collectionSchema.pre('findOne', autopopulate);

collectionSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Collection', collectionSchema);
