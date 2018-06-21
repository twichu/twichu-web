const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../twitter-services');
const oauthSignature = require('oauth-signature');
const timestamp = require('unix-timestamp');
const axios = require('axios');
const moment = require('moment');
const User = require('mongoose').model('User');

function authController() {
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
          newUser.created_at = moment(newUser.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY');
          newUser.profile_image_url_https = newUser.profile_image_url_https.replace('_normal', '');
          newUser.save((err) => {
            if (err) console.log(err);
            res.json(newUser);
          });
        } else {
          const oldUser = user;
          Object.keys(response.data).forEach((key) => {
            oldUser[key] = response.data[key];
          });
          oldUser.created_at = moment(oldUser.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY');
          oldUser.profile_image_url_https = oldUser.profile_image_url_https.replace('_normal', '');
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

  function getProfile(req, res) {
    User.findOne({
      access_token: req.headers.authorization.split(' ')[1],
    }, (err, user) => {
      if (err) console.log(err);

      if (user) {
        getVerifyCredentials(req, res, user.access_token, user.access_token_secret);
      }
    });
  }

  function patchProfile(req, res) {
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

  return { getVerifyCredentials, getProfile, patchProfile };
}

module.exports = authController;
