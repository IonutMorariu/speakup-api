const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');

exports.startChat = async (req, res) => {
	//TODO Check existing chats

	const user = await User.findOne({ _id: req.body.user._id });
	console.log(user);
	if (!user) {
		res.status(404).send('User not found');
		return;
	}
	const matchingUsers = await User.find({ native_language: user.learning_language });
	console.log(matchingUsers);
	const randomNumber = Math.floor(Math.random() * matchingUsers.length);
	const randomUser = matchingUsers[randomNumber];
	if (!randomUser) {
		res.status(404).send('No matching user found');
	}
	const newChat = await new Chat({
		user_1: user._id,
		user_2: randomUser._id
	}).save();
	const chatInfo = await Chat.findOne({ _id: newChat._id }).populate('user_2');

	if (!newChat) {
		res.status(500).send('Error creating new chat');
	}
	res.json(chatInfo);
};

exports.getChats = async (req, res) => {
	const userId = req.body.user._id; //<- Comes from checkSession middleware
	const chats = await Chat.find({ $or: [{ user_1: userId }, { user_2: userId }] })
		.populate('user_1')
		.populate('user_2');
	if (!chats) {
		res.status(404).send('No chats found');
		return;
	}
	res.send(chats);
};
