const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    getWordCloudData,
    getTrendData,
    getDocumentSummaries,
} = require('../controllers/analyticsController');

const router = express.Router();

// Word cloud data endpoint
router.get('/word-cloud', authenticateToken, getWordCloudData);

// Trends data endpoint
router.get('/trends', authenticateToken, getTrendData);

// Document summaries endpoint
router.get('/summaries', authenticateToken, getDocumentSummaries);

module.exports = router;
