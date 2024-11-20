const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    user: { type: String, required: true },
    actionType: { type: String, required: true },
    details: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
