var express = require('express');
var router = express.Router();
var Tweet = require('mongoose').model('Tweet');

/* GET tweet list. */
router.get('/tweets', function(req, res, next) {
  Tweet.find({}).exec(function(err, collection) {
    res.send(collection);
  })
});

module.exports = router;
