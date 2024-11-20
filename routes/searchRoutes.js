const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route to search documents
router.get('/', authenticateToken, SearchController.searchDocuments); // Path: /api/search
router.get('/filters', authenticateToken, SearchController.getFilters); // Path: /api/search/filters

module.exports = router;

