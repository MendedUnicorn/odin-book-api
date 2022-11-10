const postRouter = require('express').Router({ mergeParams: true });
const post = require('../controllers/postController');
const { authenticateToken } = require('../utils/utils');
const likesRouter = require('./likesPost.route');
const commentRouter = require('./comment.route');

// POST new post
postRouter.post('/', authenticateToken, post.post_post);
// GET all posts
postRouter.get('/', authenticateToken, post.get_posts);
// GET one post
postRouter.get('/:postId', authenticateToken, post.get_post);
// UPDATE one post
postRouter.put('/:postId', authenticateToken, post.update_post);
// DELETE one post
postRouter.delete('/:postId', authenticateToken, post.delete_post);

postRouter.use('/:postId/likes', likesRouter);
postRouter.use('/:postId/comments', commentRouter);

module.exports = postRouter;
