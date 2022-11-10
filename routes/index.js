var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.post('/a', (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save((err, doc) => {
    if (err) return next(err);
    console.log(doc);
  });
});

module.exports = router;
