const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
    // TODO: Define the Notifications schema
});

const Notifications = mongoose.model('Notifications', NotificationsSchema);
module.exports = Notifications;
