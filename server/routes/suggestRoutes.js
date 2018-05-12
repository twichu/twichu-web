const express = require('express');
const Tweet = require('mongoose').model('Tweet');

const router = express.Router();

router.get('/tweet', (req, res) => {
  Tweet.find({}).exec((err, collection) => {
    res.send(collection);
  });
});

router.get('/user', (req, res) => {
  res.json({ msg: 'suggest users' });
});

module.exports = router;
