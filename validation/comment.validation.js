const { body, check } = require('express-validator');

exports.commentDataValidate = [
  body('text')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Comment needs to contain text')
    .isLength({ min: 2, max: 1000 })
    .withMessage('Max length is 1000 characters')
    .escape(),
];
