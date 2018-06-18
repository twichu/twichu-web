const mongoose = require('mongoose');
require('./models/User');
require('./models/Tweet');
require('./models/UsersTweet');
require('./models/Keyword');

module.exports = function mongooseConfig(env) {
  const url = {
    development: 'mongodb://localhost/twichu',
    production: process.env.TWICHU_DB,
  };
  mongoose.connect(url[env]);
};
