const comment = require('../controllers/commentController');
const { authenticateToken } = require('../utils/utils');
const likesRouter = require('../routes/likesComment.route');

const commentRouter = require('express').Router({ mergeParams: true });

// POST a comment
commentRouter.post('/', authenticateToken, comment.post_comment);

// GET comments
commentRouter.get('/', authenticateToken, comment.get_comments);
// GET a comment
commentRouter.get('/:commentId', authenticateToken, comment.get_comment);
// UPDATE a comment
commentRouter.put('/:commentId', authenticateToken, comment.update_comment);

// DELETE a comment

commentRouter.use('/:commentId/likes', likesRouter);

module.exports = commentRouter;
