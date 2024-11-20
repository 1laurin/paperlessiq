const Document = require('../models/Document');

// Word Cloud Data
exports.getWordCloudData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Aggregate to get top keywords/tags
        const wordCloudData = await Document.aggregate([
            { $match: { 'metadata.createdBy': userId } }, // Filter by user
            { $unwind: '$tags' }, // Separate tags into individual documents
            { $group: { _id: '$tags', count: { $sum: 1 } } }, // Count each tag
            { $sort: { count: -1 } }, // Sort by count
            { $limit: 20 }, // Limit to top 20
        ]);

        res.status(200).json(wordCloudData);
    } catch (error) {
        console.error('Error fetching word cloud data:', error.message);
        res.status(500).json({ message: 'Failed to fetch word cloud data' });
    }
};

// Trends Data
exports.getTrendData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Aggregate upload count by month
        const trendData = await Document.aggregate([
            { $match: { 'metadata.createdBy': userId } }, // Filter by user
            {
                $group: {
                    _id: {
                        year: { $year: '$uploadDate' },
                        month: { $month: '$uploadDate' },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }, // Sort by date
        ]);

        const formattedTrendData = trendData.map((item) => ({
            month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
            count: item.count,
        }));

        res.status(200).json(formattedTrendData);
    } catch (error) {
        console.error('Error fetching trend data:', error.message);
        res.status(500).json({ message: 'Failed to fetch trend data' });
    }
};

// Document Summaries
exports.getDocumentSummaries = async (req, res) => {
    try {
        const userId = req.user.id;

        // Aggregate document statuses
        const summaries = await Document.aggregate([
            { $match: { 'metadata.createdBy': userId } }, // Filter by user
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        const formattedSummaries = summaries.map((summary) => ({
            title: summary._id,
            detail: `${summary.count} documents`,
        }));

        res.status(200).json(formattedSummaries);
    } catch (error) {
        console.error('Error fetching document summaries:', error.message);
        res.status(500).json({ message: 'Failed to fetch document summaries' });
    }
};
