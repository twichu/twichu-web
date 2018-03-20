var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
  author: {
    fullname: String,
    username: String
  },
  date: Date,
  content: String,
  tags: [String] //categories
});
var Tweet = mongoose.model('Tweet', tweetSchema);

function createDefaultTweets() {
  Tweet.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Tweet.create({author: {fullname: '임동건', username: 'geon'}, date: new Date('10/5/2017'), content: '아 오늘 날씨가 안좋네', tags: ['날씨']});
      Tweet.create({author: {fullname: '정가빈', username: 'gabin'}, date: new Date('12/7/2017'), content: '프론트는 제가 맡기로 했습니다', tags: ['개발', '프론트엔드']});
      Tweet.create({author: {fullname: '유동필', username: 'pil'}, date: new Date('5/2/2017'), content: '저는 논문과 서베이를 맡겠습니다', tags: ['논문']});
      Tweet.create({author: {fullname: '이현창', username: 'hclee'}, date: new Date('2/3/2017'), content: '저는 깃을 좀 배우겠습니다', tags: ['git']});
    }
  })
}

exports.createDefaultTweets = createDefaultTweets;
