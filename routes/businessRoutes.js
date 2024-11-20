const express = require('express');
const businessController = require('../controllers/businessController');
const upload = require('../utils/multerConfig'); // Multer configuration
const router = express.Router();

// Update business details
router.put('/:id', businessController.updateBusinessDetails);

// Get business details
router.get('/:id', businessController.getBusinessDetails);

// Update business logo
router.put('/:id/logo', upload.single('logo'), businessController.updateBusinessLogo);


module.exports = router;
