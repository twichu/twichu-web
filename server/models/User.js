const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id_str: String,
  name: String,
  screen_name: String,
  location: String,
  time_zone: String,
  lang: String,
  profile_image_url: String,
  followers_count: Number,
  friends_count: Number,
  statuses_count: Number,
});
const User = mongoose.model('User', userSchema);
