const express = require('express');
const User = require('mongoose').model('User');

const router = express.Router();

router.post('/', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      const patchUser = user;
      patchUser.is_analyzing = !patchUser.is_analyzing;
      console.log(req.body.tweet_count);
      console.log(req.body.retweet_count);
      /* 입력받은 트윗과 리트윗 개수만큼 가져와서 UsersTweet에 저장 */
      patchUser.save((err) => {
        if (err) console.log(err);
        res.json(patchUser);
      });
    });
  }
});

module.exports = router;
