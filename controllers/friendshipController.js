const User = require('../models/user');
const mongoose = require('mongoose');

// GET all friends
exports.get_friends = (req, res, next) => {
  User.find().populate('user').projection();
};

// GET all friend requests
exports.get_friend_requests = () => {};

// add new friend
exports.add_friend = [
  (req, res, next) => {
    // current user adds other user to friends list
    User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { friends: req.params.userId },
      },
      (err, data) => {
        if (err) return next(err);
        return res.json({ success: true, message: 'Friend request sent' });
      }
    );
  },
];

// remove a friend - go to that users friends list a remove current user from that list as well as remove that user from current users list
exports.remove_friend = [
  async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // find current user and remove other user
      User.findByIdAndUpdate(
        req.user.id,
        { $pull: { friends: req.params.userId } },
        { new: true, session }
      );

      // find other user and remove current user
      User.findByIdAndUpdate(
        res.params.userId,
        { $pull: { friends: req.user.id } },
        { new: true, session }
      );
    } catch (err) {
      console.log(err, 'ABORT');
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
    console.log('sseess', session);
  },
];

// accept friend request
exports.accept_friend = [
  (req, res, next) => {
    User.findByIdAndUpdate(
      req.user.id,
      {
        $addToSet: { friends: req.params.user },
      },
      (err, data) => {
        if (err) return next(err);
        return res.json({ success: true, message: 'Friend request accepted' });
      }
    );
  },
];

// reject friend request
exports.reject_friend = [
  (req, res, next) => {
    User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { friends: req.user.id },
      },
      (err, data) => {
        if (err) return next(err);
        return res.json({ success: true, message: 'Friend request rejected' });
      }
    );
  },
];

// to find friends for a specific user - need to query for documents with ids from logged in users friends lists and their friend list need to contain logged in use
