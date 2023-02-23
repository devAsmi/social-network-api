const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxlength: 280 },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: (date) => timeSince(date) },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 120 },
  createdAt: { type: Date, default: Date.now, get: (date) => timeSince(date) },
  userName: { type: String, required: true },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
