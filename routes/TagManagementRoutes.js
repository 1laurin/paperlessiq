const express = require('express');
const router = express.Router();
const TagManagementController = require('../controllers/TagManagementController');

router.get('/', TagManagementController.getTagManagement);
router.post('/', TagManagementController.createTagManagement);
router.put('/:id', TagManagementController.updateTagManagement);
router.delete('/:id', TagManagementController.deleteTagManagement);

module.exports = router;
