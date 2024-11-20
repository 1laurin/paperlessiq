const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    plan: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        default: 'basic',
    },
    storageLimit: { type: Number, default: 15 }, // Storage in GB
    active: { type: Boolean, default: true },
    logo: { type: String }, // URL or path to the logo
    subscriptionStatus: {
        type: String,
        enum: ['active', 'paused', 'cancelled'],
        default: 'active',
    },
    createdAt: { type: Date, default: Date.now },
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
