const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  created_at: Date,
  id_str: String,
  text: String,
  user: {
    id_str: String,
    name: String,
    screen_name: String,
  },
  retweet_count: Number,
  favorite_count: Number,
  lang: String,
  keyword: { type: String, default: null },
});

mongoose.model('Tweet', tweetSchema);
