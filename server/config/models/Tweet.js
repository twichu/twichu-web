const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  created_at: String,
  id_str: String,
  text: String,
  user: {
    id_str: String,
    name: String,
    screen_name: String,
    profile_image_url_https: String,
  },
  reply_count: Number,
  retweet_count: Number,
  favorite_count: Number,
  lang: String,
  keywords: [String],
});

mongoose.model('Tweet', tweetSchema);
