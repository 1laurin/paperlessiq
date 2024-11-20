const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const ComplianceController = require('../controllers/ComplianceController');

router.get('/alerts', authenticateToken, ComplianceController.getComplianceAlerts);
router.get('/filters', authenticateToken, ComplianceController.getAlertFilters);

module.exports = router;
