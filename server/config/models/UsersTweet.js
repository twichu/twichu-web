const mongoose = require('mongoose');
const tweetSchema = require('mongoose').model('Tweet').schema;

const usersTweetSchema = mongoose.Schema({
  is_analyzing: { type: Boolean, default: false },
  user_id: String,
  tweets: [tweetSchema],
  retweets: [tweetSchema],
});

mongoose.model('UsersTweet', usersTweetSchema);
