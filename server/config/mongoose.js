const mongoose = require('mongoose');
const tweetModel = require('../models/Tweet');
const userModel = require('../models/User');

module.exports = function mongooseConfig(config) {
  mongoose.connect(config.db);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error...'));
  db.once('open', () => {
    console.log('DB Opened');
  });

  tweetModel.createDefaultTweets();
};
