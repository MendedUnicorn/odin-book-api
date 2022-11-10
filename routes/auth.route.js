const router = require('express').Router();
const userDataValidate = require('../validation/user.validation');
const auth = require('../controllers/authController');

// Sign up - Create new user
router.post('/signup', userDataValidate, auth.signup);

// Log in - login a user
router.post('/login', auth.login);

module.exports = router;
