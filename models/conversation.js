const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Message, MessageSchema } = require("./message");

const ConversationSchema = new Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isDirectMessage: Boolean,
  messages: [MessageSchema],
});

// static methods

ConversationSchema.statics.getAllConversationsByUser = async function getAllConversationsByUser(
  current_user
) {
  let conversations = await Conversation.find({
    members: current_user,
  }).populate("members");

  return conversations;
};

ConversationSchema.statics.getConversationById = async function getConversationById(
  id
) {
  let conversation = await Conversation.findById(id).populate("members");

  return conversation;
};

// instance methods

ConversationSchema.methods.getConversationTitle = function getConversationTitle(
  current_user
) {
  for (let i = 0; i <= this.members.length - 1; i++) {
    if (this.members[i] && String(this.members[i]._id) !== current_user) {
      return {
        id: this.members[i]._id,
        firstName: this.members[i].firstName,
        lastName: this.members[i].lastName,
      };
    } else {
      continue;
    }
  }
  return;
};

ConversationSchema.methods.getLatestMessage = function getLatestMessage() {
  this.messages.length !== 0
    ? (this.messages = this.messages[this.messages.length - 1])
    : (this.messages = null);
  return this.messages;
};

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
