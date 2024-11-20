const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/SettingsController');

router.get('/', SettingsController.getSettings);
router.post('/', SettingsController.createSettings);
router.put('/:id', SettingsController.updateSettings);
router.delete('/:id', SettingsController.deleteSettings);

module.exports = router;
