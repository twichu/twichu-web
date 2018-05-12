const mongoose = require('mongoose');
require('./models/Tweet');
require('./models/User');

module.exports = function mongooseConfig(env) {
  const url = {
    development: 'mongodb://localhost/twichu',
    production: process.env.TWICHU_DB,
  };
  mongoose.connect(url[env]);
};
