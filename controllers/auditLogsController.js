const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
    try {
        const { startDate, endDate, user, actionType } = req.query;

        const filters = {};

        if (startDate) filters.date = { ...filters.date, $gte: new Date(startDate) };
        if (endDate) filters.date = { ...filters.date, $lte: new Date(endDate) };
        if (user) filters.user = user;
        if (actionType) filters.actionType = actionType;

        const logs = await AuditLog.find(filters).sort({ date: -1 });

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ message: 'Failed to fetch audit logs' });
    }
};
