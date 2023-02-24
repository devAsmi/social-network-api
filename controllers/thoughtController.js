const Thought = require("../models/thought");
const User = require("../models/user");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //getting a single thought by _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).then((thought) =>
      !thought
        ? res.status(404).json({ message: "There is no thought with this id" })
        : res.json(thought)
    );
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          {
            username: req.body.userName,
          },
          {
            $push: { thoughts: thought._id },
          },
          { new: true }
        ).then(() => res.json(thought));
      })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "There is no thought with this id to update!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "There is no thought with this id!" })
          : User.findOneAndUpdate(
              {
                username: thought.userName,
              },
              {
                $pull: { thoughts: thought._id },
              },
              { new: true }
            ).then(() => res.json(thought))
      )
      .catch((err) => res.status(500).json(err));
  },
  createReactionForThought(req, res) {
    // logic to add a reaction to the thought
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $push: { reactions: req.body },
      },
      { new: true }
    )
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).send();
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  deleteReactionForThought(req, res) {
    // logic to delete a reaction from the thought
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $pull: { reactions: { _id: req.params.reactionsId } },
      },
      { new: true }
    )
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).send();
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};
