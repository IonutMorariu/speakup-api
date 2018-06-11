const mongoose = require('mongoose');
const User = mongoose.model('User');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
	// res.json(req.body);
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		res.status(401).send('Email/password do not match.');
		return;
	}
	bcrypt.compare(req.body.password, user.password, function(err, result) {
		req.body.user = { _id: user._id };
		if (result) {
			return next();
		} else if (!result) {
			res.status(401).send('Email/password do not match.');
		}
	});
};

exports.generateSession = async (req, res) => {
	const session_token = uuid.v4();
	const user = await User.findOneAndUpdate(
		{ _id: req.body.user._id },
		{ session_token },
		{
			new: true,
			runValidators: true
		}
	);
	if (user) {
		res.json({ session_token: user.session_token });
		return;
	} else {
		res.status(404);
	}
};

exports.logout = async (req, res) => {
	const user = await User.findOneAndUpdate(
		{ session_token: req.body.session_token },
		{ session_token: undefined },
		{
			new: true,
			runValidators: true
		}
	);

	if (user) {
		res.json(user.session_token);
		return;
	} else {
		res.status(401).send('Invalid session token');
	}
};

exports.checkSession = async (req, res, next) => {
	const session_token = req.query.session_token || ' ';
	const user = await User.findOne({ session_token });
	if (user) {
		req.body.user = {
			_id: user._id
		};
		return next();
	} else {
		res.status(401).send('Invalid session token');
	}
};
