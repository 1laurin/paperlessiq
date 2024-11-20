const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); // Import your Lead model

// POST /api/leads
router.post('/', async (req, res) => {
    const { name, email, phone, company, message } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const lead = new Lead({ name, email, phone, company, message });
        await lead.save();
        res.status(200).json({ message: 'Your details have been submitted successfully.' });
    } catch (error) {
        console.error('Error saving lead:', error.message);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;

