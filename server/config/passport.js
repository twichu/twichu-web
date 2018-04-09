const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../../twitter-services');
const User = require('mongoose').model('User');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new TwitterStrategy({
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:3000/api/auth/twitter/callback"
    },
    function (token, tokenSecret, profile, cb) {
      User.findOne({
        'id_str': profile.id
      }, function (err, user) {
        if (err) {
          return cb(err);
        }

        if (!user) {
          user = new User(profile._json);
          user.save(function (err) {
            if (err) console.log(err);
            return cb(err, user);
          });
        } else {
          return cb(err, user);
        }
      });
    }
  ));

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};