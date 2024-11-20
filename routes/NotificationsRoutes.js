const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/NotificationsController');

router.get('/', NotificationsController.getNotifications);
router.post('/', NotificationsController.createNotifications);
router.put('/:id', NotificationsController.updateNotifications);
router.delete('/:id', NotificationsController.deleteNotifications);

module.exports = router;
