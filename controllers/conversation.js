const { Conversation } = require("../models/conversation");
const { User } = require("../models/user");

const createConversation = async (request, response) => {
  let { isDirectMessage, users } = request.body;

  if (!isDirectMessage || !users) {
    return response.status(400).json({ error: "Missing required params" });
  }

  users.push(request.user._id);

  users = await User.find({
    _id: {
      $in: users,
    },
  });

  let newConversation = await new Conversation({
    members: users,
    isDirectMessage,
    messages: [],
  });

  if (!newConversation || !users) {
    return response
      .status(400)
      .json({ message: "the conversation could not be created" });
  } else {
    users.forEach((user) => {
      user.conversations.push(newConversation.id);
      user.save();
    });
    newConversation.save();
    return response.status(201).json({
      message: "conversation created successfully",
      data: newConversation.id,
    });
  }
};

const getConversationsByUser = async (request, response, next) => {
  const { id } = request.user;

  const conversations = await Conversation.find({ members: id });
  conversations.forEach((conversation) => {
    conversation.messages.length !== 0
      ? (conversation.messages =
          conversation.messages[conversation.messages.length - 1])
      : (conversation.messages = null);
  });
  return response.status(200).json(conversations);
};

module.exports = { createConversation, getConversationsByUser };
