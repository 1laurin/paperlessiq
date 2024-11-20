const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware'); // Adjust path as necessary

const router = express.Router();

// Token validation route
router.get('/validate', authenticateToken, (req, res) => {
    console.log('Token validated successfully for user:', req.user);
    res.status(200).json(req.user); // Respond with the user object attached to the request
});

module.exports = router;
