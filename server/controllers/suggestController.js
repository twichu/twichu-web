const User = require('mongoose').model('User');
const Tweet = require('mongoose').model('Tweet');
const Keyword = require('mongoose').model('Keyword');

function suggestController() {
  function getKeywords(req, res) {
    Keyword.find().exec((err, collection) => {
      res.send(collection.map((doc => doc.keyword)));
    });
  }

  function getTrends(req, res) {
    Tweet.aggregate().sample(15).exec((err, collection) => {
      res.send(collection);
    });
  }

  function getTweets(req, res) {
    if (req.headers.authorization) {
      User.findOne({
        access_token: req.headers.authorization.split(' ')[1],
      }, (err, user) => {
        if (err) console.log(err);

        const query = [];
        user.keywords.forEach((element) => {
          query.push({ keyword: element });
        });

        /* 사용자의 관심사에 맞는 최근 인기 트윗 1000개 중 무작위 20개 추천 */
        Tweet.aggregate([
          { $match: { $or: query } },
          { $sort: { created_at: -1 } },
          { $limit: 1000 },
        ]).sample(20).exec((err, collection) => {
          res.send(collection);
        });
      });
    }
  }

  function getUsers(req, res) {
    if (req.headers.authorization) {
      User.findOne({
        access_token: req.headers.authorization.split(' ')[1],
      }, (err, user) => {
        if (err) console.log(err);

        /* 사용자의 관심사에 맞는 유저 중 무작위 20명 추천 */
        User.aggregate([{
          $match: {
            $and: [
              { keywords: { $in: user.keywords } }, { _id: { $ne: user._id } },
            ],
          },
        }]).sample(20).exec((err, collection) => {
          res.send(collection);
        });
      });
    }
  }

  return { getKeywords, getTrends, getTweets, getUsers };
}

module.exports = suggestController;
