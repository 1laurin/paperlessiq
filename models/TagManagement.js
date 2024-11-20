const mongoose = require('mongoose');

const TagManagementSchema = new mongoose.Schema({
    // TODO: Define the TagManagement schema
});

const TagManagement = mongoose.model('TagManagement', TagManagementSchema);
module.exports = TagManagement;
