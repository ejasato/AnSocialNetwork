const { Thought, User } = require('../models');

module.exports = {
  //Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Get a single user by its _id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID has been found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Post a new user
  createUser(req, res) {
    User.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Put to update a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID has been found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Delete to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //create to add a friend using user and friend Id
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //delete friend using the userId and friend Id
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => !user
        ? res.status(404).json({ message: 'Could not find user with the given ID!' })
        : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};