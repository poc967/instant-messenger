const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Message, MessageSchema } = require("./message");

const ConversationSchema = new Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isDirectMessage: Boolean,
  messages: [MessageSchema],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
