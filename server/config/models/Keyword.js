const mongoose = require('mongoose');

const keywordSchema = mongoose.Schema({
  keyword: { type: String, default: null },
});

mongoose.model('Keyword', keywordSchema);
