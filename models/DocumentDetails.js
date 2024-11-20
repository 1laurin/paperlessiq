const mongoose = require('mongoose');

const documentDetailsSchema = new mongoose.Schema({
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document', // Reference to the Document model
        required: true,
    },
    versionHistory: [
        {
            version: Number,
            date: Date,
            changes: String, // Description of changes in this version
        },
    ],
    processingNotes: [
        {
            note: String,
            date: {
                type: Date,
                default: Date.now,
            },
            addedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the user who added the note
            },
        },
    ],
    auditLogs: [
        {
            action: String, // e.g., "Viewed", "Updated", "Flagged for Review"
            date: {
                type: Date,
                default: Date.now,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the user who performed the action
            },
        },
    ],
    viewCount: {
        type: Number,
        default: 0, // Count how many times the document has been viewed
    },
    sharedWith: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Users the document is shared with
        },
    ],
    flags: [
        {
            issue: String, // Description of the issue
            date: {
                type: Date,
                default: Date.now,
            },
            flaggedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // User who flagged the document
            },
        },
    ],
});

module.exports = mongoose.model('DocumentDetails', documentDetailsSchema);
