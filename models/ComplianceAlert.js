const mongoose = require('mongoose');

// Define the Compliance Alert schema
const complianceAlertSchema = new mongoose.Schema({
    issueType: {
        type: String,
        required: true, // e.g., "Missing Metadata", "Incomplete Document"
    },
    description: {
        type: String,
        required: true,
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document', // Reference to the Document model
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'Resolved', 'Pending'], // Status of the alert
        default: 'Open',
    },
    date: {
        type: Date,
        default: Date.now, // Timestamp for when the alert was created
    },
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User who resolved the alert (if applicable)
    },
    resolutionNotes: {
        type: String, // Notes about how the issue was resolved
    },
});

module.exports = mongoose.model('ComplianceAlert', complianceAlertSchema);
