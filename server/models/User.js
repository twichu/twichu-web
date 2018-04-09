var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  id_str: String,
  name: String,
  screen_name: String,
  location: String,
  time_zone: String,
  lang: String,
  profile_image_url: String,
});
var User = mongoose.model('User', userSchema);
