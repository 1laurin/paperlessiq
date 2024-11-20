const mongoose = require('mongoose');

const AnalyticsReportsSchema = new mongoose.Schema({
    // TODO: Define the AnalyticsReports schema
});

const AnalyticsReports = mongoose.model('AnalyticsReports', AnalyticsReportsSchema);
module.exports = AnalyticsReports;
