const mongoose = require('mongoose');

const UserManagementSchema = new mongoose.Schema({
    // TODO: Define the UserManagement schema
});

const UserManagement = mongoose.model('UserManagement', UserManagementSchema);
module.exports = UserManagement;
