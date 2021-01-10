const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, trim: true, required: true },
  isRead: Boolean,
  time: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message, MessageSchema };
