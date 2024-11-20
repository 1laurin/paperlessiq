const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                // Allow both relative paths and URLs
                return /^(https?:\/\/|\/?uploads\/)/.test(value);
            },
            message: (props) => `${props.value} is not a valid URL or file path!`,
        },
    },

    uploadDate: {
        type: Date,
        default: Date.now,
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now, // Set default for simplicity
    },
    description: {
        type: String, // Optional description of the document
    },
    tags: {
        type: [String], // Array of tags for categorization and search functionality
        default: [],
    },
    ocrData: {
        type: mongoose.Schema.Types.Mixed, // Store OCR data in a flexible format
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    metadata: {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true, // Index for faster lookups
        },
        ownerName: {
            type: String, // Store owner name directly to avoid frequent population
        },
        fileSize: {
            type: Number, // Size of the document in bytes
        },
        fileType: {
            type: String, // MIME type, e.g., 'application/pdf'
        },
    },
    downloadUrl: {
        type: String, // URL for downloading the document
    },
    complianceStatus: {
        isCompliant: {
            type: Boolean,
            default: true,
        },
        issues: [
            {
                type: {
                    type: String,
                },
                description: {
                    type: String,
                },
            },
        ],
    },
    status: {
        type: String,
        enum: ['Uploaded', 'Processed', 'Flagged', 'Completed'],
        default: 'Uploaded',
    },
    analysisData: {
        type: mongoose.Schema.Types.Mixed, // Store analysis or extracted data
        default: {},
    },
    notifications: [
        {
            message: { type: String },
            date: { type: Date, default: Date.now },
            seen: { type: Boolean, default: false },
            expiresAt: { type: Date, default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 }, // 30 days
        },
    ],
});

module.exports = mongoose.model("Document", documentSchema, "documents");
