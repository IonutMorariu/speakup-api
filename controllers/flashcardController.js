const mongoose = require('mongoose');
const Flashcard = mongoose.model('Flashcard');

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
	const flashcards = await Flashcard.find({ f_collection: req.query.collection });
	console.log(req.query);
	if (flashcards.length > 0) {
		res.json(flashcards);
		return;
	}
	res.status(404).send('Collection not found');
};
