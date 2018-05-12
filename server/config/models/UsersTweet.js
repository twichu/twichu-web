const mongoose = require('mongoose');

const usersTweetSchema = mongoose.Schema({
  is_analyzing: { type: Boolean, default: false },
  user_id: String,
  tweets: [Object],
  retweets: [Object],
});

mongoose.model('UsersTweet', usersTweetSchema);
