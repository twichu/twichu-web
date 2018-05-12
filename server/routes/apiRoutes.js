const express = require('express');
const authRouter = require('./authRoutes');
const analysisRoutes = require('./analysisRoutes');
const suggestRoutes = require('./suggestRoutes');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/analysis', analysisRoutes);
router.use('/suggest', suggestRoutes);

module.exports = router;
