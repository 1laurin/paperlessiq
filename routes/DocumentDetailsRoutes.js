const express = require('express');
const router = express.Router();
const DocumentDetailsController = require('../controllers/DocumentDetailsController');

router.get('/', DocumentDetailsController.getDocumentDetails);
router.post('/', DocumentDetailsController.createDocumentDetails);
router.put('/:id', DocumentDetailsController.updateDocumentDetails);
router.delete('/:id', DocumentDetailsController.deleteDocumentDetails);

module.exports = router;
