const { body, check } = require('express-validator');

exports.postDataValidate = [
  body('text')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Post needs to contain text')
    .isLength({ min: 2, max: 1000 })
    .withMessage('Max length is 1000 characters')
    .escape(),
  check('picture')
    .custom((value, { req }) => {
      if (
        req.file.mimetype === 'image/png' ||
        req.file.mimetype === 'image/jpg' ||
        req.file.mimetype === 'image/jpeg'
      ) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('Only submit image file (png, jpg, jpeg'),
];

exports.updatePostDataValidate = [
  body('text')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Post needs to contain text')
    .isLength({ min: 2, max: 1000 })
    .withMessage('Max length is 1000 characters')
    .escape(),
  check('picture')
    .optional()
    .custom((value, { req }) => {
      if (
        req.file.mimetype === 'image/png' ||
        req.file.mimetype === 'image/jpg' ||
        req.file.mimetype === 'image/jpeg'
      ) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('Only submit image file (png, jpg, jpeg'),
];

// exports.postDataValidate = postDataValidate;
// exports.updatePostDataValidate = updatePostDataValidate;
