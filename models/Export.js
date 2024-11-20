const mongoose = require('mongoose');

const ExportSchema = new mongoose.Schema({
    // TODO: Define the Export schema
});

const Export = mongoose.model('Export', ExportSchema);
module.exports = Export;
