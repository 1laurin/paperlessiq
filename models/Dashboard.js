const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    recentFiles: [
        {
            name: { type: String, required: true },
            dateUploaded: { type: Date, required: true },
            lastUpdated: { type: Date, required: true },
            size: { type: String, required: true }, // e.g., "2MB"
            owner: {
                name: { type: String, required: true },
                avatar: { type: String, required: true }, // URL to the owner's avatar
            },
        },
    ],
    storageUsed: { type: Number, required: true }, // GB
    storageLimit: { type: Number, default: 15 }, // GB
    fileTypes: [
        {
            type: { type: String, required: true }, // e.g., "PDF", "Word"
            color: { type: String, required: true }, // e.g., "bg-blue-500"
        },
    ],
});

const Dashboard = mongoose.model('Dashboard', DashboardSchema);
module.exports = Dashboard;
