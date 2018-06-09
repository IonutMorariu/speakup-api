const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
	name: {
		type: String,
		required: 'You must supply a name'
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: 'You must supply an email',
		validate: [validator.isEmail, 'Invalid ']
	},
	session_token: {
		type: String,
		lowercase: true
	}
});

userSchema.virtual('gravatar').get(function() {
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
