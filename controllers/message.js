const { response } = require("express");
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
  conversation.hasUnreadMessages = true;
  conversation.messages.push(message);
  conversation.save();
  return response.status(200).json(message);
};

const markMessagesAsRead = async (request, response) => {
  let { identifier } = request.params;

  let conversation = await Conversation.findOne({ _id: identifier });
  if (!conversation) {
    return response.status(400).json("no conversation found");
  }

  conversation.hasUnreadMessages = false;
  conversation.save();
  return response.status(200).json("conversation marked as read");
};

module.exports = { createMessage, markMessagesAsRead };
