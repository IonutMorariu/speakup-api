const mongoose = require('mongoose');
const Collection = mongoose.model('Collection');

exports.createCollection = async (req, res) => {
	const collection = await new Collection({ name: req.body.name, author: req.body.user._id }).save();
	if (collection) {
		res.json(collection);
		return;
	}
};

exports.getCollections = async (req, res) => {
	const collections = await Collection.find({ author: req.body.user._id });
	if (collections) {
		res.json(collections);
		return;
	} else {
		res.status(404).send('This user has no collections');
	}
};
