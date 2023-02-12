const { Thought } = require('../models');

module.exports = {
    //Get to get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .cathc((err) => res.status(500).json(err));
    },
    //Get to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No Thought with that ID has been found' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    //Post to create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //Put to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No Thought with that ID has been found' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    //Delete to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            ! thought
                ? res.status(404).json({ message: 'No course with that ID' })
                : res.json({ message: 'Course and students deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },
    createReaction(req, res) {
        Thought.Reaction.create(req.body)
        .then((reactions) => res.json(reactions))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    deleteReaction(req,res) {
      Thought.Reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then((reactions) =>
        !reactions
          ? res.status(404).json({ message: 'No friend with that ID' })
          : res.status(500).json(err));
    },
}