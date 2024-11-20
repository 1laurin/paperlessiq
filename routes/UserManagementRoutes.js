const express = require('express');
const router = express.Router();
const UserManagementController = require('../controllers/UserManagementController');

router.get('/', UserManagementController.getUserManagement);
router.post('/', UserManagementController.createUserManagement);
router.put('/:id', UserManagementController.updateUserManagement);
router.delete('/:id', UserManagementController.deleteUserManagement);

module.exports = router;
