const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  access_token: String,
  access_token_secret: String,
  id_str: String,
  name: String,
  screen_name: String,
  location: String,
  time_zone: String,
  followers_count: Number,
  friends_count: Number,
  statuses_count: Number,
  lang: String,
  profile_image_url: String,
});

const User = mongoose.model('User', userSchema);
