const Post = require('../models/post');
const { validationResult } = require('express-validator');
const upload = require('../config/multer.config');
const {
  postDataValidate,
  updatePostDataValidate,
} = require('../validation/post.validation');
const fs = require('node:fs');
const { checkCanUpdate } = require('../utils/utils');

exports.get_posts = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) return next(err);
    return res.json({ success: true, posts });
  });
};

exports.get_post = (req, res, next) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) return next(err);
    return res.json({ success: true, post });
  });
};

// Post a new post
exports.post_post = [
  (req, res, next) => {
    upload.single('picture')(req, res, (err) => {
      if (err) res.json({ success: false, errors: err.message, e: err.status });
      return next();
    });
  },

  postDataValidate,

  (req, res, next) => {
    console.log('does req contain user?', req.user);
    const errors = validationResult(req);

    const newPost = new Post({
      user: req.user.id || '636a5b933b0045b7ee7b72b9',
      text: req.body.text,
      picture: req?.file?.destination + req?.file?.filename,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    newPost.save((err, post) => {
      if (err) return next(err);
      return res.json({ success: true, post });
    });
  },
];

exports.update_post = [
  (req, res, next) => {
    upload.single('picture')(req, res, (err) => {
      if (err) res.json({ success: false, errors: err.message, e: err.status });
      return next();
    });
  },
  updatePostDataValidate,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, errors });
    }

    // if new picture exists, then add the new path
    const picture =
      typeof req.file == 'undefined'
        ? {}
        : { picture: req?.file?.destination + req?.file?.filename };
    // Only creator of post can update
    Post.findOneAndUpdate(
      { _id: req.params.postId, user: req.user.id },
      {
        ...req.body,
        // if new picture exists, then add the new path
        ...picture,
      },
      (err, data) => {
        console.log('err', err, 'data', data);
        if (err) return next(err);
        if (!data) return res.json({ success: false, message: 'No access' });
        // If new picture added, then delete old
        if (req.file) {
          fs.unlink(data.picture && data.picture, (err) => {
            if (err) return next(err);
            console.log('Picture updated');
          });
        }

        res.json({ success: true, post: data });
      }
    );
  },
];

exports.delete_post = [
  (req, res, next) => {
    Post.findOneAndDelete(
      { _id: req.params.postId, user: req.user.id },
      (err, data) => {
        if (err) return next(err);
        if (!data) return res.json({ success: false, message: 'No access' });
        if (data.picture) {
          fs.unlink(data.picture, (err) => {
            if (err) return next(err);
            console.log('Picture deleted');
          });
        }
        return res.json({ success: true, data: data, message: 'Post deleted' });
      }
    );
  },
];
