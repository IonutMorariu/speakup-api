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

exports.getFlashcards = async (req, res) => {
	const collection = await Collection.findOne({ _id: req.query.collection });
	console.log(collection);
	console.log(req.query);
	if (!collection) {
		res.status(404).send('Collection Not found test');
		return;
	}
	const flashcards = await Flashcard.find({ f_collection: collection._id });
	console.log(flashcards);
	res.json(flashcards);
};

exports.removeFlashcards = async (req, res) => {
	console.log(req.body);
	const flashcard = await Flashcard.findByIdAndRemove({ _id: req.body.flashcard });
	if (!flashcard) {
		res.status(404).send('Flashcard not found');
		return;
	}
	res.status(200).send('Flashcard removed');
};
