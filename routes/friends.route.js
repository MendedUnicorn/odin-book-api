const friendsRouter = require('express').Router({ mergeParams: true });
const friends = require('../controllers/friendshipController');
const { authenticateToken } = require('../utils/utils');

// GET friends

// POST - add friend
friendsRouter.post('/:userId', authenticateToken, friends.add_friend);

// POST - accept friend
friendsRouter.post('/userId:/accept', authenticateToken, friends.accept_friend);

// DELETE - reject friend
friendsRouter.delete(
  '/userId:/reject',
  authenticateToken,
  friends.reject_friend
);

// DELETE - remove friend
friendsRouter.delete('/userId:', authenticateToken, friends.remove_friend);

module.exports = friendsRouter;
