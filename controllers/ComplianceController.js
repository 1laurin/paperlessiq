const ComplianceAlert = require('../models/ComplianceAlert'); // Adjust the model path if necessary

// Fetch compliance alerts with filters
exports.getComplianceAlerts = async (req, res) => {
    try {
        const { issueType, startDate, endDate, status } = req.query;
        const filters = {};

        // Add filters dynamically
        if (issueType) {
            filters.issueType = issueType;
        }
        if (startDate) {
            filters.date = { ...filters.date, $gte: new Date(startDate) };
        }
        if (endDate) {
            filters.date = { ...filters.date, $lte: new Date(endDate) };
        }
        if (status) {
            filters.status = status;
        }

        const alerts = await ComplianceAlert.find(filters).sort({ date: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error("Error fetching compliance alerts:", error);
        res.status(500).json({ message: "Failed to fetch compliance alerts" });
    }
};

// Fetch available filters for compliance alerts
exports.getAlertFilters = async (req, res) => {
    try {
        const filters = await ComplianceAlert.aggregate([
            {
                $facet: {
                    issueTypes: [{ $group: { _id: '$issueType' } }],
                    statuses: [{ $group: { _id: '$status' } }],
                },
            },
        ]);

        res.status(200).json({
            issueTypes: filters[0].issueTypes.map((type) => type._id),
            statuses: filters[0].statuses.map((status) => status._id),
        });
    } catch (error) {
        console.error("Error fetching alert filters:", error);
        res.status(500).json({ message: "Failed to fetch alert filters" });
    }
};
