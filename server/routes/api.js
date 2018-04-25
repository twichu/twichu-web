var express = require('express');
var router = express.Router();
var Tweet = require('mongoose').model('Tweet');
const passport = require('passport');

/* GET tweet list. */
router.get('/tweets', function (req, res, next) {
  Tweet.find({}).exec(function (err, collection) {
    res.send(collection);
  })
});

router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: 'http://127.0.0.1:8080/',
    failureRedirect: '/',
  }),
);

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn('/'),
  function (req, res) {
    res.json({
      user: req.user
    });
  });

module.exports = router;