const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business', // Link to the Business model
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'invited'],
        default: 'user',
    },
    title: { type: String }, // User's work title (e.g., "Software Engineer")
    profilePicture: { type: String }, // URL or path to the profile picture
    preferredContactMethod: { type: String },
    termsAgreed: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
