const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userProfileController');
const upload = require('../helpers/imageHelper');
const generateCSRFToken = require("../helpers/tokenGenerator");

// Display user profile
router.get('/profile/:userId', generateCSRFToken, UserController.getUserProfile);
// Update user profile
router.post('/profile/:userId' ,upload.upload.single('profileImage') ,UserController.updateUserProfile);

module.exports = router;
