const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

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

module.exports = router;
