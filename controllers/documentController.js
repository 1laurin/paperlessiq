// controllers/documentController.js
const mongoose = require('mongoose'); // Add this import

const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
    try {
        const { title, description } = req.body;
        const fileUrl = req.file ? req.file.path : null;
        const createdBy = req.user.id;

        console.log('Upload Document Debug:', {
            title,
            fileUrl,
            createdBy,
            file: req.file
        });

        const newDocument = new Document({
            title,
            description,
            fileUrl,
            uploadDate: Date.now(),
            metadata: {
                createdBy,
                fileSize: req.file.size,
                fileType: req.file.mimetype,
                originalName: req.file.originalname
            }
        });

        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading document' });
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ 'metadata.createdBy': req.user.id });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents' });
    }
};

exports.getDocumentById = async (req, res) => {
    console.log(`Attempting to fetch document ID: ${req.params.documentId}`);

    try {
        const { documentId } = req.params;

        console.log(`Fetching document by ID: ${documentId}`);

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(documentId)) {
            return res.status(400).json({ message: 'Invalid document ID' });
        }

        // Find the document
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        console.error('Error fetching document by ID:', error);
        res.status(500).json({ message: 'Error fetching document' });
    }
};


exports.updateDocument = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updates = {
            title,
            description,
            lastModified: Date.now()
        };

        if (req.file) {
            updates.fileUrl = req.file.path;
            updates['metadata.fileSize'] = req.file.size;
            updates['metadata.fileType'] = req.file.mimetype;
        }

        const document = await Document.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document' });
    }
};

exports.getRecentDocuments = async (req, res) => {
    try {
        console.log("Fetching recent documents for user:", req.user.id);

        const documents = await Document.find({ 'metadata.createdBy': req.user.id })
            .sort({ uploadDate: -1 })
            .limit(5);

        console.log("Recent documents fetched:", documents);

        if (!documents.length) {
            return res.status(404).json({ message: "No recent documents found" });
        }

        res.status(200).json(documents);
    } catch (error) {
        console.error("Error in getRecentDocuments:", error.message);
        res.status(500).json({ error: "Failed to fetch recent documents" });
    }
};

exports.searchDocuments = async (req, res) => {
    try {
        const userId = req.user.id;
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const documents = await Document.find({
            owner: userId,
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search by document name
                { tags: { $regex: query, $options: 'i' } }, // Search by tags
                { content: { $regex: query, $options: 'i' } }, // Search by content (if applicable)
            ],
        });

        res.status(200).json(documents);
    } catch (error) {
        console.error("Error searching documents:", error);
        res.status(500).json({ message: "Failed to search documents" });
    }
};
