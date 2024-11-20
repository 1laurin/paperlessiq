const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    fetchDocumentsForExport,
    handleExportRequest,
} = require('../controllers/exportController');

const router = express.Router();

// Route to fetch documents with filters for export
router.get('/documents', authenticateToken, fetchDocumentsForExport);

// Route to handle export requests
router.post('/export', authenticateToken, handleExportRequest);

module.exports = router;
