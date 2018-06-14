const mongoose = require('mongoose');
const Flashcard = mongoose.model('Flashcard');
const Collection = mongoose.model('Collection');

exports.createFlashcard = async (req, res) => {
	const flashcard = await new Flashcard({
		f_collection: req.body.collection,
		front_text: req.body.front_text,
		back_text: req.body.back_text
	}).save();
	if (flashcard) {
		res.json({ flashcard });
	}
};

exports.getFlashCards = async (req, res) => {
	const collection = await Collection.findOne({ id: req.query.collection });
	if (!collection) {
		res.status(404).send('Collection Not found');
		return;
	}
	const flashcards = await Flashcard.find({ f_collection: collection._id });
	console.log(flashcards);
	res.json(flashcards);
};
