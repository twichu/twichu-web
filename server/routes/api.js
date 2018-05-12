const express = require('express');
const OAuth = require('oauth');
const oauthSignature = require('oauth-signature');
const timestamp = require('unix-timestamp');
const axios = require('axios');
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../../twitter-services');

const router = express.Router();

const Tweet = require('mongoose').model('Tweet');
const User = require('mongoose').model('User');

/* GET tweet list. */
router.get('/tweets', (req, res) => {
  Tweet.find({}).exec((err, collection) => {
    res.send(collection);
  });
});

const oauthService = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1',
);

function getVerifyCredentials(req, res, oauthAccessToken, oauthAccessTokenSecret) {
  const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
  const params = {
    oauth_consumer_key: TWITTER_CONSUMER_KEY,
    oauth_nonce: (`vueauth-${new Date().getTime()}`),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp.now(),
    oauth_token: oauthAccessToken,
    oauth_version: '1.0',
  };
  const signature = oauthSignature.generate('GET', url, params, TWITTER_CONSUMER_SECRET, oauthAccessTokenSecret);

  axios.get(url, {
    headers: {
      Authorization: 'OAuth ' +
        `oauth_consumer_key="${params.oauth_consumer_key}",` +
        `oauth_nonce="${params.oauth_nonce}",` +
        `oauth_signature="${signature}",` +
        `oauth_signature_method="${params.oauth_signature_method}",` +
        `oauth_timestamp="${params.oauth_timestamp}",` +
        `oauth_token="${params.oauth_token}",` +
        `oauth_version="${params.oauth_version}"`,
    },
  }).then((response) => {
    User.findOne({
      id_str: response.data.id_str,
    }, (err, user) => {
      if (err) console.log(err);

      if (!user) {
        const newUser = new User(response.data);
        newUser.access_token = oauthAccessToken;
        newUser.access_token_secret = oauthAccessTokenSecret;
        newUser.save((err) => {
          if (err) console.log(err);
          res.json(newUser);
        });
      } else {
        const oldUser = user;
        Object.keys(response.data).forEach((key) => {
          oldUser[key] = response.data[key];
        });
        oldUser.save((err) => {
          if (err) console.log(err);
          res.json(oldUser);
        });
      }
    });
  }).catch((err) => {
    res.status(500).json(err);
  });
}

router.post('/auth/twitter', (req, res) => {
  if (!req.body.oauth_token) {
    oauthService.getOAuthRequestToken(
      { oauth_callback: req.body.redirectUri },
      (error, oauthToken, oauthTokenSecret) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.json({
            oauth_token: oauthToken,
            oauth_token_secret: oauthTokenSecret,
          });
        }
      },
    );
  } else {
    oauthService.getOAuthAccessToken(
      req.body.oauth_token, null, req.body.oauth_verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret) => {
        if (error) {
          res.status(500).json(error);
        } else {
          getVerifyCredentials(req, res, oauthAccessToken, oauthAccessTokenSecret);
        }
      },
    );
  }
});

router.get('/profile', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      if (user) {
        getVerifyCredentials(req, res, user.access_token, user.access_token_secret);
      }
    });
  }
});

router.patch('/profile', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      const patchUser = user;
      patchUser.keywords = req.body.keywords;
      patchUser.save((err) => {
        if (err) console.log(err);
        res.json(patchUser);
      });
    });
  }
});

module.exports = router;
