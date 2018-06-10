const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.validateRegister = (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'You must supply a name!').notEmpty();
	req.sanitizeBody('username');
	req.checkBody('username', 'You must supply a username').notEmpty();
	req.checkBody('email', 'That email is not valid').isEmail();
	req.sanitizeBody('email').normalizeEmail({
		gmail_remove_dots: false,
		gmail_remove_extension: false,
		gmail_remove_subaddress: false
	});
	req.checkBody('password', 'Password cannot be blank').notEmpty();
	req.checkBody('confirm-password', 'Confirmed password cannot be blank').notEmpty();
	req.checkBody('confirm-password', "Oops! Passwords don't match").equals(req.body.password);
	const errors = req.validationErrors();
	if (errors) {
		res.json(errors);
		return;
	}
	next();
};
exports.register = async (req, res) => {
	const user = await new User(req.body).save();
	res.send(user);
};
