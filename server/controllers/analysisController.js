const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../twitter-services');
const oauthSignature = require('oauth-signature');
const timestamp = require('unix-timestamp');
const axios = require('axios');
const User = require('mongoose').model('User');
const UsersTweet = require('mongoose').model('UsersTweet');

function analysisController() {
  function getUserTimeline(req, userId, oauthAccessToken, oauthAccessTokenSecret) {
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    const params = {
      oauth_consumer_key: TWITTER_CONSUMER_KEY,
      oauth_nonce: (`vueauth-${new Date().getTime()}`),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp.now(),
      oauth_token: oauthAccessToken,
      oauth_version: '1.0',
    };
    const signature = oauthSignature.generate('GET', url, params, TWITTER_CONSUMER_SECRET, oauthAccessTokenSecret);

    /* 입력받은 트윗과 리트윗 개수만큼 가져와서 UsersTweet에 저장 */
    console.log(req.body.tweet_count);
    console.log(req.body.retweet_count);

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
      const userstweet = new UsersTweet();
      userstweet.user_id = userId;
      response.data.forEach((element) => {
        if (element.text.indexOf('RT @') === 0) {
          userstweet.retweets.push(element);
        } else {
          userstweet.tweets.push(element);
        }
      });
      userstweet.save((err) => {
        if (err) console.log(err);
      });
    });
  }

  function postAnalysis(req, res) {
    if (req.headers.authorization) {
      User.findOne({
        access_token: req.headers.authorization.split(' ')[1],
      }, (err, user) => {
        if (err) console.log(err);

        const patchUser = user;
        patchUser.is_analyzing = !patchUser.is_analyzing;
        getUserTimeline(req, patchUser.id, patchUser.access_token, patchUser.access_token_secret);
        patchUser.save((err) => {
          if (err) console.log(err);
          res.json(patchUser);
        });
      });
    }
  }

  return { getUserTimeline, postAnalysis };
}

module.exports = analysisController;
