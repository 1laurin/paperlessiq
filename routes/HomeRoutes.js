const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.getHome);
router.post('/', HomeController.createHome);
router.put('/:id', HomeController.updateHome);
router.delete('/:id', HomeController.deleteHome);

module.exports = router;
