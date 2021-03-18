const { Conversation } = require("../models/conversation");
const { Message } = require("../models/message");

const createMessage = async (request, response) => {
  let { conversation, message } = request.body;

  if (!conversation || !message) {
    return response
      .status(400)
      .json({ error: "must provide a conversation and message" });
  }

  conversation = await Conversation.findOne({ _id: conversation });
  message = await new Message({
    message: message,
    author: request.user._id,
  });
  message.save();
  conversation = await Conversation.findOne({ _id: conversation });

  conversation.messages.push(message);
  conversation.save();
  return response.status(200).json(message);
};

module.exports = { createMessage };
