const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userProfileController');

// Display user profile
router.get('/profile/:userId', UserController.getUserProfile);

module.exports = router;
