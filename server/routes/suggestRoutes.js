const express = require('express');
const User = require('mongoose').model('User');
const Tweet = require('mongoose').model('Tweet');

const router = express.Router();

router.get('/tweet', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      console.log(user);
      /* 유저 keywords와 트윗 keyword 비교해서 해당 트윗 추천 (시간 리트윗 댓글 추천 수) */
      Tweet.find({}).exec((err, collection) => {
        res.send(collection);
      });
    });
  }
});

router.get('/user', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      console.log(user);
      /* 유저 keywords와 유저 keywords 비교해서 해당 유저 추천 */
      User.find({}).select('name screen_name id_str profile_image_url_https').exec((err, collection) => {
        res.send(collection);
      });
    });
  }
});

module.exports = router;
