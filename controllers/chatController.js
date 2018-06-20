const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const Message = mongoose.model('Message');

exports.startChat = async (req, res) => {
	//TODO Check existing chats

	const user = await User.findOne({ _id: req.body.user._id });
	if (!user) {
		res.status(404).send('User not found');
		return;
	}
	const matchingUsers = await User.find({ native_language: user.learning_language }).select('-session_token');

	matchingUsers.some(async (e, i) => {
		const chat = await Chat.findOne({
			$or: [{ user_1: e._id, user_2: user._id }, { user_1: user._id, user_2: e._id }]
		});
		if (!chat) {
			const newChat = await new Chat({ user_1: user._id, user_2: e._id }).save();
			res.json(newChat);
			return true;
		}
		console.log(chat);
	});

	/*
	const newChat = await new Chat({
		user_1: user._id,
		user_2: randomUser._id
	}).save();
	const chatInfo = await Chat.findOne({ _id: newChat._id }).populate('user_2', '-session_token');

	if (!newChat) {
		res.status(500).send('Error creating new chat');
	}
	res.json(chatInfo);
	*/
};

exports.getChats = async (req, res) => {
	const userId = req.body.user._id; //<- Comes from checkSession middleware
	const chats = await Chat.find({ $or: [{ user_1: userId }, { user_2: userId }] })
		.populate('user_1', '-session_token')
		.populate('user_2', '-session_token');
	if (!chats) {
		res.status(404).send('No chats found');
		return;
	}
	res.send(chats);
};

exports.getMessages = async (req, res) => {
	const messages = await Message.find({ chat: req.query.chat }).populate('user', '-session_token');
	res.json(messages);
};

exports.createMessage = async (req, res) => {
	const message = await new Message({
		text: req.body.text,
		user: req.body.user._id,
		chat: req.body.chat
	}).save();
	res.json(message);
};
