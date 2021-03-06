const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const flashcardController = require('../controllers/flashcardController');
const collectionController = require('../controllers/collectionController');
const chatController = require('../controllers/chatController');

router.get('/', (req, res) => {
	res.json({
		name: 'Ionut',
		age: 100,
		cool: true
	});
});

router.get('/health-check', (req, res) => {
	res.sendStatus(200);
});

//User routes

router.post('/user/register', userController.validateRegister, catchErrors(userController.register));
router.post('/user/login', catchErrors(authController.login), catchErrors(authController.generateSession));
router.post('/user/logout', catchErrors(authController.logout));
router.post('/api/check-session', catchErrors(authController.checkSession), (req, res) => {
	res.status(200).send('Session is valid');
});
router.post('/user/get-user', catchErrors(authController.checkSession), (req, res) => {
	res.json({ _id: req.body.user._id, session_token: req.body.session_token });
});

//API ROUTES

router.get('/api/health-test', catchErrors(authController.checkSession), userController.healthTest);

router.post(
	'/api/collection',
	catchErrors(authController.checkSession),
	catchErrors(collectionController.createCollection)
);

router.get(
	'/api/collection',
	catchErrors(authController.checkSession),
	catchErrors(collectionController.getCollections)
);

router.delete(
	'/api/collection',
	catchErrors(authController.checkSession),
	catchErrors(collectionController.removeCollection)
);

router.post(
	'/api/flashcard',
	catchErrors(authController.checkSession),
	catchErrors(flashcardController.createFlashcard)
);

router.get(
	'/api/flashcard',
	catchErrors(authController.checkSession),
	catchErrors(flashcardController.getFlashcards)
);

router.delete(
	'/api/flashcard',
	catchErrors(authController.checkSession),
	catchErrors(flashcardController.removeFlashcard)
);

router.post('/api/chat', catchErrors(authController.checkSession), catchErrors(chatController.startChat));
router.get('/api/chat', catchErrors(authController.checkSession), catchErrors(chatController.getChats));
router.delete('/api/chat', catchErrors(authController.checkSession), catchErrors(chatController.removeChat));
router.get('/api/message', catchErrors(authController.checkSession), catchErrors(chatController.getMessages));
router.post(
	'/api/message',
	catchErrors(authController.checkSession),
	catchErrors(chatController.createMessage)
);

module.exports = router;
