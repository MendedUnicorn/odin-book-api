const Post = require('../models/post');
const Comment = require('../models/comment');

exports.like_post_likes = (req, res, next) => {
  console.log('first', req.user.id);
  Post.findByIdAndUpdate(
    req.params.postId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
    (err, data) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Post liked', post: data });
    }
  );
};

exports.unlike_post_likes = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { likes: req.user.id } },
    { new: true },
    (err, data) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Post unliked', post: data });
    }
  );
};

exports.like_comment_likes = (req, res, next) => {
  console.log('first', req.user.id);
  Comment.findByIdAndUpdate(
    req.params.commentId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
    (err, data) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Comment liked', comment: data });
    }
  );
};

exports.unlike_comment_likes = (req, res, next) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    { $pull: { likes: req.user.id } },
    { new: true },
    (err, data) => {
      if (err) return next(err);
      res.json({ success: true, message: 'Comment unliked', comment: data });
    }
  );
};
