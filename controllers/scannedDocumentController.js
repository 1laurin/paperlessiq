// controllers/scannedDocumentController.js
const Document = require('../models/Document');

exports.handleScannedDocument = async (req, res) => {
    try {
        const { title, description } = req.body;
        const fileUrl = req.file ? req.file.path : null;
        const createdBy = req.user.id;

        // Validate file type for scanned documents
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                error: 'Invalid file type',
                details: 'Scanned documents must be JPG, PNG, or PDF'
            });
        }

        // Here you could add OCR processing logic
        // const processedText = await processOCR(fileUrl);

        const newDocument = new Document({
            title,
            description,
            fileUrl,
            uploadDate: Date.now(),
            metadata: {
                createdBy,
                fileSize: req.file.size,
                fileType: req.file.mimetype,
                originalName: req.file.originalname,
                isScanned: true,
                // processedText: processedText // If you implement OCR
            }
        });

        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        console.error('Scanned document upload error:', error);
        res.status(500).json({ message: 'Error processing scanned document' });
    }
};