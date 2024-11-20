const mongoose = require('mongoose');
const Document = require('../models/Document');

// Utility function for error responses
const createErrorResponse = (res, status, error, details) => {
    return res.status(status).json({ error, details });
};

// Middleware to validate document uploads
exports.validateDocument = (req, res, next) => {
    const { title } = req.body;

    if (!title) {
        return createErrorResponse(res, 400, 'Validation error', 'Title is required');
    }

    if (!req.file) {
        return createErrorResponse(res, 400, 'Validation error', 'File is required');
    }

    const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
        return createErrorResponse(
            res,
            400,
            'Invalid file type',
            `Allowed types: ${allowedTypes.join(', ')}`
        );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
        return createErrorResponse(
            res,
            400,
            'File too large',
            'Maximum file size is 5MB'
        );
    }

    next();
};

// Middleware to check access to a specific document
exports.checkDocumentAccess = async (req, res, next) => {
    try {
        const documentId = req.params.id;

        // Skip middleware if no ID is expected
        if (!documentId || documentId === 'upload' || documentId === 'recent') {
            return next();
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(documentId)) {
            return res.status(400).json({
                error: "Invalid document ID",
                details: "Document ID must be a valid ObjectId",
            });
        }

        // Fetch document
        const document = await Document.findOne({
            _id: documentId,
            deleted: false,
            'metadata.createdBy': req.user.id,
        });

        if (!document) {
            return res.status(403).json({
                error: "Access denied",
                details: "You do not have access to this document",
            });
        }

        req.document = document;
        next();
    } catch (error) {
        console.error("Error checking document access:", error);
        return res.status(500).json({
            error: "Server error",
            details: "Failed to check document access",
        });
    }
};
