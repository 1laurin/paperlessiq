const express = require('express');
const multer = require('multer');
const { authenticateToken } = require('../middleware/authMiddleware');

const {
    validateDocument,
    checkDocumentAccess,
} = require('../middleware/documentMiddleware');
const {
    uploadDocument,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getAllDocuments,
    getRecentDocuments, // Controller for fetching recent documents
} = require('../controllers/documentController');
const { handleScannedDocument } = require('../controllers/scannedDocumentController'); // Controller for scanned docs

const router = express.Router();

// Multer configuration
const upload = multer({ dest: 'uploads/' });

// Define routes with static paths first
router.post('/upload', authenticateToken, upload.single('file'), validateDocument, uploadDocument);
router.post('/scanned-upload', authenticateToken, upload.single('file'), handleScannedDocument);
router.get('/recent', authenticateToken, getRecentDocuments);
router.get('/', authenticateToken, getAllDocuments);

// Define parameterized routes for document details
router.get('/:documentId/details', authenticateToken, checkDocumentAccess, getDocumentById); // Fetch single document by ID
router.put('/:documentId/update', authenticateToken, checkDocumentAccess, validateDocument, updateDocument); // Update document by ID
router.delete('/:documentId/delete', authenticateToken, checkDocumentAccess, deleteDocument); // Delete document by ID

module.exports = router;
