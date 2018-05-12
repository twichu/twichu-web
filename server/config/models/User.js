const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  access_token: String,
  access_token_secret: String,
  id_str: String,
  name: String,
  screen_name: String,
  profile_image_url: String,
  statuses_count: Number,
  friends_count: Number,
  followers_count: Number,
  description: String,
  location: String,
  url: String,
  lang: String,
  keywords: [String],
  is_analyzing: { type: Boolean, default: false },
});

mongoose.model('User', userSchema);
