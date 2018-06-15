const mongoose = require('mongoose');
const Collection = mongoose.model('Collection');
const Flashcard = mongoose.model('Flashcard');

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

exports.removeCollection = async (req, res) => {
	console.log(req.body);
	const collection = await Collection.findOneAndRemove({ _id: req.body.collection });
	if (!collection) {
		res.status(404).send('Collection not found');
	}
	await Flashcard.deleteMany({ f_collection: collection._id });
	res.status(200).send('Collection removed');
};
