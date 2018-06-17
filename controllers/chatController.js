const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');

exports.startChat = async (req, res) => {
	const user = await User.findOne({ _id: req.body.user._id });
	console.log(user);
	if (!user) {
		res.status(404).send('User not found');
		return;
	}
	const matchingUsers = await User.find({ native_language: user.learning_language });
	console.log(matchingUsers);

	const randomUser = matchingUsers[Math.floor(Math.random() * matchingUsers.length)];
	if (!randomUser) {
		res.status(404).send('No matching user found');
	}
	const newChat = await new Chat({
		user_1: user._id,
		user_2: randomUser._id
	}).save();

	if (!newChat) {
		res.status(500).send('Error creating new chat');
	}
	res.json(newChat);
};
