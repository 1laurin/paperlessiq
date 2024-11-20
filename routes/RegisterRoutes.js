const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.get('/', RegisterController.getRegister);
router.post('/', RegisterController.createRegister);
router.put('/:id', RegisterController.updateRegister);
router.delete('/:id', RegisterController.deleteRegister);

module.exports = router;
