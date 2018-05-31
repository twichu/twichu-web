const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();
const { postAnalysis } = analysisController();

router.post('/', postAnalysis);

module.exports = router;
