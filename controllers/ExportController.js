const Document = require('../models/Document');
const { parse } = require('json2csv'); // For CSV export
const PDFDocument = require('pdfkit'); // For PDF export

// Fetch documents with filters for export
exports.fetchDocumentsForExport = async (req, res) => {
    try {
        const { query, tags, startDate, endDate, fileType, status } = req.query;
        const filters = {};

        if (query) {
            filters.title = { $regex: query, $options: 'i' }; // Case-insensitive title search
        }
        if (tags) {
            filters.tags = { $in: tags.split(',').map(tag => tag.trim()) };
        }
        if (startDate) {
            filters.uploadDate = { ...filters.uploadDate, $gte: new Date(startDate) };
        }
        if (endDate) {
            filters.uploadDate = { ...filters.uploadDate, $lte: new Date(endDate) };
        }
        if (fileType) {
            filters['metadata.fileType'] = fileType;
        }
        if (status) {
            filters.status = status;
        }

        const documents = await Document.find(filters).select('title tags uploadDate metadata status');
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents for export:', error);
        res.status(500).json({ message: 'Failed to fetch documents for export' });
    }
};

// Handle export requests
exports.handleExportRequest = async (req, res) => {
    try {
        const { documentIds, format } = req.body;

        if (!documentIds || !documentIds.length) {
            return res.status(400).json({ message: 'No documents selected for export' });
        }

        const documents = await Document.find({ _id: { $in: documentIds } });

        if (format === 'CSV') {
            // Convert to CSV
            const fields = ['title', 'tags', 'uploadDate', 'metadata.fileType', 'status'];
            const csv = parse(documents, { fields });
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=export.csv');
            return res.status(200).send(csv);
        } else if (format === 'PDF') {
            // Convert to PDF
            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=export.pdf');
            doc.pipe(res);

            documents.forEach(docData => {
                doc.text(`Title: ${docData.title}`);
                doc.text(`Tags: ${docData.tags.join(', ')}`);
                doc.text(`Upload Date: ${new Date(docData.uploadDate).toLocaleDateString()}`);
                doc.text(`File Type: ${docData.metadata.fileType}`);
                doc.text(`Status: ${docData.status}`);
                doc.moveDown();
            });

            doc.end();
        } else if (format === 'JSON') {
            // Convert to JSON
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', 'attachment; filename=export.json');
            return res.status(200).json(documents);
        } else {
            return res.status(400).json({ message: 'Unsupported export format' });
        }
    } catch (error) {
        console.error('Error handling export request:', error);
        res.status(500).json({ message: 'Failed to export documents' });
    }
};
