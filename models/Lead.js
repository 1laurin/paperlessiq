const mongoose = require('mongoose');

// Define the schema for the Leads collection
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Prevent duplicate entries
    phone: { type: String }, // Optional phone number
    company: { type: String }, // Optional company name
    message: { type: String, required: true }, // Message or inquiry details
    createdAt: { type: Date, default: Date.now }, // Timestamp of lead creation
});

module.exports = mongoose.model('Lead', leadSchema);
