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

  let conversations = await Conversation.getAllConversationsByUser(id);

  for (let i = 0; i <= conversations.length - 1; i++) {
    conversations[i].messages = conversations[i].getLatestMessage();

    conversations[i].members = conversations[i].getConversationTitle(id);
  }
  return response.status(200).json(conversations);
};

module.exports = { createConversation, getConversationsByUser };
