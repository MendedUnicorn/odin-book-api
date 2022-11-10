const { body } = require('express-validator');
const User = require('../models/user');

const userDataValidate = [
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isLength({ min: 2, max: 50 })
    .isAlphanumeric()
    .withMessage('Only user numbers and characters')
    .custom((value) => {
      return User.find({ username: value }).then((user) => {
        if (user.length > 0) {
          return Promise.reject('Username is already in use');
        }
        return Promise.resolve('All good');
      });
    }),
  body('email')
    .isEmail()
    .withMessage('Provide valid email')
    .custom((value) => {
      return User.find({ email: value }).then((user) => {
        if (user.length > 0) {
          return Promise.reject('Email is already in use');
        }
        return Promise.resolve('All good');
      });
    }),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),
  body('passwordRepeated')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage('Passwords do not match'),
];

module.exports = userDataValidate;
