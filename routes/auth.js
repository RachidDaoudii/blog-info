const express = require('express');
const router = express.Router();
const ControllerAuth = require('../controllers/authController');
const upload = require('../helpers/imageHelper')

router.get('/', ControllerAuth.index)
router.get('/register', ControllerAuth.register)
router.post('/signup', ControllerAuth.signup);
router.post('/login', ControllerAuth.login);
router.post('/logout', ControllerAuth.logout);

module.exports = router;