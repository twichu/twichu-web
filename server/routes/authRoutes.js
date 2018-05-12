const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../twitter-services');
const express = require('express');
const oauth = require('oauth');
const authController = require('../controllers/authController');

const router = express.Router();
const { getVerifyCredentials, getProfile, patchProfile } = authController();

const oauthService = new oauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1',
);

router.post('/twitter', (req, res) => {
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

router.route('/profile')
  .all((req, res, next) => {
    if (req.headers.authorization) {
      next();
    }
  })
  .get(getProfile)
  .patch(patchProfile);

module.exports = router;
