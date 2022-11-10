const { commentDataValidate } = require('../validation/comment.validation');
const { validationResult } = require('express-validator');
const Comment = require('../models/comment');

exports.post_comment = [
  commentDataValidate,
  (req, res, next) => {
    newComment = new Comment({
      user: req.user.id,
      text: req.body.text,
      post: req.params.postId,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty)
      return res.json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });

    newComment.save((err, data) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Comment saved', comment: data });
    });
  },
];

exports.get_comments = (req, res, next) => {
  Comment.find({ post: req.params.postId }, (err, data) => {
    if (err) return next(err);
    res.json({ succss: true, message: 'Retrieved comments', comments: data });
  });
};

exports.get_comment = (req, res, next) => {
  Comment.findById(req.params.commentId, (err, data) => {
    if (err) return next(err);
    res.json({ success: true, message: 'Retrieved comment', comment: data });
  });
};

exports.update_comment = (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user.id },
    req.body,
    { new: true },
    (err, data) => {
      if (err) return next(err);
      if (!data) return res.json({ success: false, message: 'No access' });
      res.json({ success: true, message: 'Comment updated', comment: data });
    }
  );
};
