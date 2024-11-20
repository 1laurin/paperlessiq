const express = require('express');
const {
    registerUser,
    loginUser,
    inviteUser,
    getAllUsers,
    getUserDetails,
    updateUserDetails,
    deleteUserAccount,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/invite', inviteUser);
router.get('/', getAllUsers);
router.get('/:email', getUserDetails);
router.put('/user/:id', updateUserDetails);
router.delete('/user/:email', deleteUserAccount);

module.exports = router;
