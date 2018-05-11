var express = require('express');
var router = express.Router();
var Tweet = require('mongoose').model('Tweet');;
const User = require('mongoose').model('User');
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../../twitter-services');
const passport = require('passport');
var OAuth = require('oauth');
var timestamp = require('unix-timestamp');
var oauthSignature = require('oauth-signature');
var axios = require('axios');

/* GET tweet list. */
router.get('/tweets', function (req, res, next) {
  Tweet.find({}).exec(function (err, collection) {
    res.send(collection);
  })
});

oauthService = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
)

router.post('/auth/twitter', (req, res) => {
  if (!req.body.oauth_token) {
    oauthService.getOAuthRequestToken({ oauth_callback: req.body.redirectUri }, function (error, oauthToken, oauthTokenSecret, results) {
      if (error) {
        res.status(500).json(error)
      } else {
        res.json({
          oauth_token: oauthToken,
          oauth_token_secret: oauthTokenSecret
        })
      }
    })
  } else {
    oauthService.getOAuthAccessToken(req.body.oauth_token, null, req.body.oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {

      if (error) {
        res.status(500).json(error)
      } else {
        var verifyCredentialsUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json'
        var parameters = {
          oauth_consumer_key: TWITTER_CONSUMER_KEY,
          oauth_token: oauthAccessToken,
          oauth_nonce: ('vueauth-' + new Date().getTime()),
          oauth_timestamp: timestamp.now(),
          oauth_signature_method: 'HMAC-SHA1',
          oauth_version: '1.0'
        }

        var signature = oauthSignature.generate('GET', verifyCredentialsUrl, parameters, TWITTER_CONSUMER_SECRET, oauthAccessTokenSecret)

        axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', { 
          headers: {
            Authorization:  'OAuth ' +
              'oauth_consumer_key="' + TWITTER_CONSUMER_KEY + '",' +
              'oauth_token="' + oauthAccessToken + '",' +
              'oauth_nonce="' + parameters.oauth_nonce + '",' +
              'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
              'oauth_signature_method="HMAC-SHA1",'+
              'oauth_version="1.0",' +
              'oauth_signature="' + signature + '"'
          }
        }).then(function (response) {
          User.findOne({
            'id_str': response.data.id_str
          }, function (err, user) {
            if (err) console.log(err);
    
            if (!user) {
              user = new User(response.data);
              user.access_token = oauthAccessToken;
              user.access_token_secret = oauthAccessTokenSecret;
              user.save(function (err) {
                if (err) console.log(err);
                res.json(user);
              });
            } else {
              res.json(user);
            }
          });
        }).catch(function (err) {
          console.log(err.response.data)
          res.status(500).json(err.response.data)
        })
      }
    })
  }
})

// router.get('/auth/twitter',
//   passport.authenticate('twitter'));

// router.get('/auth/twitter/callback',
//   passport.authenticate('twitter', {
//     successRedirect: 'http://127.0.0.1:8080/',
//     failureRedirect: '/',
//   }),
// );

router.get('/profile', (req, res) => {
  if (req.headers.authorization) {

    User.findOne({
      'access_token': req.headers.authorization.split(' ')[1]
    }, function (err, user) {
      if (err) console.log(err);

      if (user) {
        var oauthAccessToken = user.access_token;
        var oauthAccessTokenSecret = user.access_token_secret;

        var verifyCredentialsUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json'
        var parameters = {
          oauth_consumer_key: TWITTER_CONSUMER_KEY,
          oauth_token: oauthAccessToken,
          oauth_nonce: ('vueauth-' + new Date().getTime()),
          oauth_timestamp: timestamp.now(),
          oauth_signature_method: 'HMAC-SHA1',
          oauth_version: '1.0'
        }

        var signature = oauthSignature.generate('GET', verifyCredentialsUrl, parameters, TWITTER_CONSUMER_SECRET, oauthAccessTokenSecret)
        
        axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', { 
          headers: {
            Authorization:  'OAuth ' +
              'oauth_consumer_key="' + TWITTER_CONSUMER_KEY + '",' +
              'oauth_token="' + oauthAccessToken + '",' +
              'oauth_nonce="' + parameters.oauth_nonce + '",' +
              'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
              'oauth_signature_method="HMAC-SHA1",'+
              'oauth_version="1.0",' +
              'oauth_signature="' + signature + '"'
          }
        }).then(function (response) {
          user.description = response.data.description
          user.followers_count = response.data.followers_count
          user.friends_count = response.data.friends_count
          user.lang = response.data.lang
          user.location = response.data.location
          user.name = response.data.name
          user.profile_image_url = response.data.profile_image_url
          user.screen_name = response.data.screen_name
          user.statuses_count = response.data.statuses_count
          user.url = response.data.url

          user.save(function (err) {
            if (err) console.log(err);
            res.json(user);
          });
        }).catch(function (err) {
          console.log(err.response.data)
          res.status(500).json(err.response.data)
        })
      }
    });

  }
});

router.patch('/profile', (req, res) => {
  if (req.headers.authorization) {
    User.findOne({
      'access_token': req.headers.authorization.split(' ')[1]
    }, function (err, user) {
      if (err) console.log(err);
      if(req.body._id) delete req.body._id
      if(req.body.access_token) delete req.body.access_token
      if(req.body.access_token_secret) delete req.body.access_token_secret
      if(req.body.id_str) delete req.body.id_str

      for(var p in req.body)
      {
        user[p] = req.body[p];
      }
      user.save(function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(user);
        }
      });
    });
  }
});

router.get('/hometimeline', (req, res) => {
  if (req.headers.authorization) {
    var oauthAccessToken;
    var oauthAccessTokenSecret;

    User.findOne({
      'access_token': req.headers.authorization.split(' ')[1]
    }, function (err, user) {
      if (err) console.log(err);

      if (user) {
        oauthAccessToken = user.access_token;
        oauthAccessTokenSecret = user.access_token_secret;
      }
    });

    var verifyCredentialsUrl = 'https://api.twitter.com/1.1/statuses/home_timeline.json'
    var parameters = {
      oauth_consumer_key: TWITTER_CONSUMER_KEY,
      oauth_token: oauthAccessToken,
      oauth_nonce: ('vueauth-' + new Date().getTime()),
      oauth_timestamp: timestamp.now(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0'
    }

    var signature = oauthSignature.generate('GET', verifyCredentialsUrl, parameters, TWITTER_CONSUMER_SECRET, oauthAccessTokenSecret)
    
    axios.get('https://api.twitter.com/1.1/statuses/home_timeline.json', { 
      headers: {
        Authorization:  'OAuth ' +
          'oauth_consumer_key="' + TWITTER_CONSUMER_KEY + '",' +
          'oauth_token="' + oauthAccessToken + '",' +
          'oauth_nonce="' + parameters.oauth_nonce + '",' +
          'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
          'oauth_signature_method="HMAC-SHA1",'+
          'oauth_version="1.0",' +
          'oauth_signature="' + signature + '"'
      }
    }).then(function (response) {
      res.json(response.data);
    }).catch(function (err) {
      console.log(err.response.data)
      res.status(500).json(err.response.data)
    })
  }
});

module.exports = router;