const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;

require('dotenv').config({ path: '../variables.env' });

const userSchema = new Schema({
	name: {
		type: String,
		required: 'You must supply a name'
	},
	username: {
		type: String,
		required: 'You must supply a username',
		trim: true,
		unique: true
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: 'You must supply an email',
		validate: [validator.isEmail, 'Invalid ']
	},
	password: {
		type: String,
		required: 'You must supply a password',
		select: false
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

userSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.password, 12, function(err, hash) {
		if (err) {
			next(err);
			return;
		}
		user.password = hash;
		next();
	});
	user.session_token = null;
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
