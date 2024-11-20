const Business = require('../models/Business');
const path = require('path');


// Update business details
exports.updateBusinessDetails = async (req, res) => {
    const { id } = req.params;
    const { name, logo, subscriptionStatus } = req.body;

    try {
        const updatedBusiness = await Business.findByIdAndUpdate(
            id,
            { name, logo, subscriptionStatus },
            { new: true } // Return the updated document
        );

        if (!updatedBusiness) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json({ message: 'Business updated successfully', updatedBusiness });
    } catch (error) {
        console.error('Error updating business:', error);
        res.status(500).json({ message: 'Failed to update business.' });
    }
};

// Get business details
exports.getBusinessDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const business = await Business.findById(id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch (error) {
        console.error('Error fetching business details:', error);
        res.status(500).json({ message: 'Failed to fetch business details.' });
    }
};

exports.updateBusinessLogo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const logoPath = path.join('/uploads', req.file.filename); // Construct the file path

        const updatedBusiness = await Business.findByIdAndUpdate(
            id,
            { logo: logoPath },
            { new: true } // Return the updated document
        );

        if (!updatedBusiness) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json({ message: 'Logo updated successfully', updatedBusiness });
    } catch (error) {
        console.error('Error updating business logo:', error);
        res.status(500).json({ message: 'Failed to update business logo' });
    }
};