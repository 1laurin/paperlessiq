const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/UploadController');

router.get('/', UploadController.getUpload);
router.post('/', UploadController.createUpload);
router.put('/:id', UploadController.updateUpload);
router.delete('/:id', UploadController.deleteUpload);

module.exports = router;
