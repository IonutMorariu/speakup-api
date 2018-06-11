const mongoose = require('mongoose');
const Collection = mongoose.model('Collection');

exports.createCollection = async (req, res) => {
	const collection = new Collection({ name: req.body.name }).save();
	res.json(collection);
};
