const likesRouter = require('express').Router({ mergeParams: true });
const likes = require('../controllers/likesController');
const { authenticateToken } = require('../utils/utils');

likesRouter.get('/', (req, res) => {
  res.json({ message: 'Kind of works', par: req.params });
});

// Like a post
likesRouter.put('/', authenticateToken, likes.like_comment_likes);

// Unlike a post
likesRouter.delete('/', authenticateToken, likes.unlike_comment_likes);

module.exports = likesRouter;
