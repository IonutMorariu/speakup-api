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
	const checkedUsers = [];
	while (checkedUsers.length < matchingUsers.length) {
		const randNumber = Math.floor(Math.random() * matchingUsers.length);
		const randUser = matchingUsers[randNumber];
		const chat = await Chat.findOne({
			$or: [{ user_1: randUser._id, user_2: user._id }, { user_1: user._id, user_2: randUser._id }]
		});
		if (chat) {
			checkedUsers.push(randUser);
		} else {
			const newChat = await new Chat({ user_1: user._id, user_2: randUser._id }).save();
			res.json(newChat);
			break;
		}
	}
	if (checkedUsers.length == matchingUsers.length) {
		res.status(404).send('No user match found');
	}
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
		chat: req.body.chat,
		createdAt: req.body.createdAt
	}).save();
	res.json(message);
};

exports.removeChat = async (req, res) => {
	const chat = await Chat.findOneAndRemove({ _id: req.body.id });
	if (!chat) {
		res.status(404).send('Chat not found');
		return;
	}
	res.status(200).send('Chat delete successfully');
};
