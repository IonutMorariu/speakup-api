const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const validator = require('validator');
const bcrypt = require('bcrypt');
const md5 = require('md5');
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
	learning_language: {
		type: String,
		required: 'You must supply a learning language'
	},
	native_language: {
		type: String,
		required: 'You must supply a native language'
	},
	session_token: {
		type: String,
		lowercase: true
	},
	avatar: {
		type: String
	}
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
	const hash = md5(user.email);
	user.avatar = `https://gravatar.com/avatar/${hash}?s=200&d=identicon`;
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
