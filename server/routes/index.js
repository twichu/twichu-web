var express = require('express');
var path = require('path');
var router = express.Router();
var apiRouter = require('./api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

router.use('/api', apiRouter);

module.exports = router;
