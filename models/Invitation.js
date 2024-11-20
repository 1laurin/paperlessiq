const mongoose = require('mongoose');

const InvitationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    setupToken: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '24h' }, // Expire after 24 hours
});

module.exports = mongoose.model('Invitation', InvitationSchema);
