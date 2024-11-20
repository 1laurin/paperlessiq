const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getAuditLogs } = require('../controllers/auditLogsController');

const router = express.Router();

router.get('/', authenticateToken, getAuditLogs);

module.exports = router;
