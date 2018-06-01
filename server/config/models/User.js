const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  access_token: String,
  access_token_secret: String,
  id_str: String,
  name: String,
  screen_name: String,
  profile_image_url_https: String,
  statuses_count: Number,
  friends_count: Number,
  followers_count: Number,
  description: String,
  location: String,
  url: String,
  lang: String,
  created_at: String,
  keywords: [String],
  is_analyzing: { type: Boolean, default: false },
  get_tweets_count: { type: Number, default: 0 },
  get_retweets_count: { type: Number, default: 0 },
});

mongoose.model('User', userSchema);
