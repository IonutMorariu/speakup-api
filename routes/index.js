const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');

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

router.post('/user/register', catchErrors(userController.registerUser));
module.exports = router;
