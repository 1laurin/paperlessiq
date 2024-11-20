const Document = require('../models/Document');

exports.searchDocuments = async (req, res) => {
    try {
        const userId = req.user.id; // Extract the authenticated user ID
        const { query, tags, startDate, endDate, fileType, status } = req.query;

        console.log("Received search filters:", { query, tags, startDate, endDate, fileType, status });

        // Build the filter object dynamically
        const filters = {
            'metadata.createdBy': userId,
        };

        // Add search query filter
        if (query) {
            filters.$or = [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
                { tags: { $regex: query, $options: 'i' } }, // Case-insensitive tag search
            ];
        }

        // Add tags filter (if provided)
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim()); // Split and trim tags
            filters.tags = { $in: tagArray };
        }

        // Add date range filters (if provided)
        if (startDate) {
            filters.uploadDate = { ...filters.uploadDate, $gte: new Date(startDate) };
        }
        if (endDate) {
            filters.uploadDate = { ...filters.uploadDate, $lte: new Date(endDate) };
        }

        // Add fileType filter (if provided)
        if (fileType) {
            filters['metadata.fileType'] = fileType;
        }

        // Add status filter (if provided)
        if (status) {
            filters.status = status;
        }

        console.log("Constructed filters:", filters);

        // Query the database
        const documents = await Document.find(filters);
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error searching documents:", error);
        res.status(500).json({ message: "Failed to search documents", error: error.message });
    }
};

exports.getFilters = async (req, res) => {
    try {
        const userId = req.user.id;

        // Aggregate tags, file types, and statuses
        const filters = await Document.aggregate([
            { $match: { 'metadata.createdBy': userId } }, // Filter by authenticated user
            {
                $facet: {
                    tags: [{ $unwind: '$tags' }, { $group: { _id: '$tags' } }],
                    fileTypes: [{ $group: { _id: '$metadata.fileType' } }],
                    statuses: [{ $group: { _id: '$status' } }],
                },
            },
        ]);

        // Transform the aggregation result
        const response = {
            tags: filters[0].tags.map((tag) => tag._id),
            fileTypes: filters[0].fileTypes.map((type) => type._id),
            statuses: filters[0].statuses.map((status) => status._id),
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ message: 'Failed to fetch filters' });
    }
};
