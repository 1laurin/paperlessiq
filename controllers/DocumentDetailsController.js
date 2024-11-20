// controllers/documentDetailsController.js
const DocumentDetails = require('../models/DocumentDetails');

exports.getDocumentDetails = async (req, res) => {
    try {
        const documentDetails = await DocumentDetails.findOne({ documentId: req.params.documentId });
        if (!documentDetails) {
            return res.status(404).json({ message: "Document details not found." });
        }
        res.status(200).json(documentDetails);
    } catch (error) {
        console.error("Error retrieving document details:", error);
        res.status(500).json({ message: "Failed to retrieve document details." });
    }
};

exports.createDocumentDetails = async (req, res) => {
    try {
        const { documentId, versionHistory, processingNotes, auditLogs } = req.body;

        const documentDetails = new DocumentDetails({
            documentId,
            versionHistory,
            processingNotes,
            auditLogs,
        });

        await documentDetails.save();
        res.status(201).json(documentDetails);
    } catch (error) {
        console.error("Error creating document details:", error);
        res.status(500).json({ message: "Failed to create document details." });
    }
};

exports.updateDocumentDetails = async (req, res) => {
    try {
        const documentDetails = await DocumentDetails.findOneAndUpdate(
            { documentId: req.params.documentId },
            { $set: req.body },
            { new: true }
        );
        if (!documentDetails) {
            return res.status(404).json({ message: "Document details not found." });
        }
        res.status(200).json(documentDetails);
    } catch (error) {
        console.error("Error updating document details:", error);
        res.status(500).json({ message: "Failed to update document details." });
    }
};

exports.deleteDocumentDetails = async (req, res) => {
    try {
        const documentDetails = await DocumentDetails.findOneAndDelete({ documentId: req.params.documentId });
        if (!documentDetails) {
            return res.status(404).json({ message: "Document details not found." });
        }
        res.status(200).json({ message: "Document details deleted successfully." });
    } catch (error) {
        console.error("Error deleting document details:", error);
        res.status(500).json({ message: "Failed to delete document details." });
    }
};
