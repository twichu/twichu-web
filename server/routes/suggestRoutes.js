const express = require('express');
const User = require('mongoose').model('User');
const Tweet = require('mongoose').model('Tweet');
const Keyword = require('mongoose').model('Keyword');

const router = express.Router();

router.get('/keywords', (req, res) => {
  Keyword.find({}).exec((err, collection) => {
    res.send(collection.map((doc => doc.keyword)));
  });
});

router.get('/trends', (req, res) => {
  Tweet.aggregate().sample(15).exec((err, collection) => {
    res.send(collection);
  });
});

router.get('/tweets', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      console.log(user.name);
      /* 유저 keywords와 트윗 keyword 비교해서 해당 트윗 추천 (시간 리트윗 댓글 추천 수) */
      Tweet.find({}).exec((err, collection) => {
        res.send(collection);
      });
    });
  }
});

router.get('/users', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      console.log(user.name);
      /* 유저 keywords와 유저 keywords 비교해서 해당 유저 추천 */
      User.find({}).select('id_str name screen_name profile_image_url_https description location statuses_count friends_count followers_count').exec((err, collection) => {
        res.send(collection);
      });
    });
  }
});

module.exports = router;
