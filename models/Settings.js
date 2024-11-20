const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    // TODO: Define the Settings schema
});

const Settings = mongoose.model('Settings', SettingsSchema);
module.exports = Settings;
