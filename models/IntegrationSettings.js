const mongoose = require('mongoose');

const IntegrationSettingsSchema = new mongoose.Schema({
    // TODO: Define the IntegrationSettings schema
});

const IntegrationSettings = mongoose.model('IntegrationSettings', IntegrationSettingsSchema);
module.exports = IntegrationSettings;
