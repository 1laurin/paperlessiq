const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
    // TODO: Define the Upload schema
});

const Upload = mongoose.model('Upload', UploadSchema);
module.exports = Upload;
