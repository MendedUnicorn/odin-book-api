const mongoose = require('mongoose');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const userDataValidate = require('../validation/user.validation');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/utils');

// Sign Up user

exports.signup = (req, res, next) => {
  // check that password and reapeat password match - perhaps do this in validation file

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    newUser.save((err, doc) => {
      if (err) return next(err);
      res.json({ success: true, user: doc });
    });
  });
};

// Login User
exports.login = [
  (req, res, next) => {
    // Check if user is trying to log in with email or username
    let user;
    if (req.body.user.includes('@')) {
      user = { email: req.body.user };
    } else {
      user = { username: req.body.user };
    }
    // check that user or email exists
    User.findOne(user, (err, data) => {
      if (err) return next(err);
      if (data <= 1) {
        return res
          .status(403)
          .json({ success: false, error: 'User do not exist' });
      }
      // check passwords match
      bcrypt.compare(req.body.password, data.password, (err, success) => {
        if (err)
          return res
            .status(403)
            .json({ success: false, error: 'Password is wrong' });
        if (success) {
          const token = generateAccessToken({
            id: data._id,
            username: data.username,
          });
          // issue token
          return res.json({ success: true, token });
        }
      });
    });
  },
];
