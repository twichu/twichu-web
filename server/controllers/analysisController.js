const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../twitter-services');
const oauthSignature = require('oauth-signature');
const timestamp = require('unix-timestamp');
const axios = require('axios');
const User = require('mongoose').model('User');
const UsersTweet = require('mongoose').model('UsersTweet');

function analysisController() {
  async function getUserTimeline(req, res, user) {
    const patchUser = user;
    const oauthAccessToken = user.access_token;
    const oauthAccessTokenSecret = user.access_token_secret;
    const userstweet = new UsersTweet();
    userstweet.user_id = patchUser.id;

    for (let maxId; req.body.tweet_count > userstweet.tweets.length ||
      req.body.retweet_count > userstweet.retweets.length;) {
      let urlparams;
      const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
      const params = {
        oauth_consumer_key: TWITTER_CONSUMER_KEY,
        oauth_nonce: (`vueauth-${new Date().getTime()}`),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: timestamp.now(),
        oauth_token: oauthAccessToken,
        oauth_version: '1.0',
        count: 200,
      };
      if (maxId != null) {
        params.max_id = maxId;
        urlparams = `${url}?count=200&max_id=${maxId}`;
      } else {
        urlparams = `${url}?count=200`;
      }
      const signature = oauthSignature.generate('GET', url, params, TWITTER_CONSUMER_SECRET, oauthAccessTokenSecret);

      const response = await axios.get(urlparams, {
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
      });

      response.data.forEach((element) => {
        if (maxId === element.id_str) return;

        if (element.text.indexOf('RT @') === 0 && req.body.retweet_count > userstweet.retweets.length) {
          userstweet.retweets.push(element);
        } else if (req.body.tweet_count > userstweet.tweets.length) {
          userstweet.tweets.push(element);
        }
      });

      if (maxId === response.data.slice(-1)[0].id_str) break;
      maxId = response.data.slice(-1)[0].id_str;
    }

    userstweet.save((err) => {
      if (err) console.log(err);

      patchUser.is_analyzing = true;
      patchUser.get_tweets_count = userstweet.tweets.length;
      patchUser.get_retweets_count = userstweet.retweets.length;
      patchUser.save((err) => {
        if (err) console.log(err);
        res.status(200).json({ msg: '분석 요청 완료!' });
      });
    });
  }

  function postAnalysis(req, res) {
    if (req.headers.authorization) {
      User.findOne({
        access_token: req.headers.authorization.split(' ')[1],
      }, (err, user) => {
        if (err) console.log(err);

        if (user.is_analyzing === false) {
          getUserTimeline(req, res, user);
        } else {
          res.status(202).json({ msg: '분석 중입니다...' });
        }
      });
    }
  }

  return { getUserTimeline, postAnalysis };
}

module.exports = analysisController;
