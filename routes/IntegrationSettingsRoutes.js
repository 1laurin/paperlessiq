const express = require('express');
const router = express.Router();
const IntegrationSettingsController = require('../controllers/IntegrationSettingsController');

router.get('/', IntegrationSettingsController.getIntegrationSettings);
router.post('/', IntegrationSettingsController.createIntegrationSettings);
router.put('/:id', IntegrationSettingsController.updateIntegrationSettings);
router.delete('/:id', IntegrationSettingsController.deleteIntegrationSettings);

module.exports = router;
