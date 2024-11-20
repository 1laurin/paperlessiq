const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

router.get('/', DashboardController.getDashboard);
router.post('/', DashboardController.createDashboard);
router.put('/:id', DashboardController.updateDashboard);
router.delete('/:id', DashboardController.deleteDashboard);

module.exports = router;
