const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
	res.json({ it: 'worked' });
});

module.exports = router;
