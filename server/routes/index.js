const express = require('express');
const path = require('path');

const router = express.Router();
const apiRouter = require('./api');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  next();
});

router.use('/api', apiRouter);

module.exports = router;
