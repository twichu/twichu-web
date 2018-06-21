const express = require('express');
const suggestController = require('../controllers/suggestController');

const router = express.Router();
const { getKeywords, getTrends, getTweets, getUsers } = suggestController();

router.get('/keywords', getKeywords);
router.get('/trends', getTrends);
router.get('/tweets', getTweets);
router.get('/users', getUsers);

module.exports = router;
