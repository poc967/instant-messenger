const { Conversation } = require("../models/conversation");
const { User } = require("../models/user");

const createConversation = async (request, response) => {
  let { isDirectMessage, users } = request.body;

  if (!isDirectMessage || !users) {
    return response.status(400).json("Missing required params");
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
    conversationTitle = newConversation.getConversationTitle(request.user._id);
    latestMessage = newConversation.getLatestMessage();
    return response.status(201).json({
      conversation: newConversation,
      title: conversationTitle,
      latestMessage,
    });
  }
};

const getConversationsByUser = async (request, response, next) => {
  const currentUser = request.user.id;

  let conversations = await Conversation.getAllConversationsByUser(currentUser);
  let latestMessage, title;

  for (let i = 0; i <= conversations.length - 1; i++) {
    let conversation = conversations[i];
    latestMessage = conversation.getLatestMessage();

    title = conversation.getConversationTitle(currentUser);
    conversations[i] = { conversation, latestMessage, title };
  }
  return response.status(200).json(conversations);
};

const getConversationById = async (request, response, next) => {
  const id = request.params.identifier;
  const currentUser = request.user.id;

  let conversation = await Conversation.getConversationById(id);
  let title = conversation.getConversationTitle(currentUser);

  if (conversation && title) {
    return response.status(200).json({ conversation, title });
  } else {
    return response.status(400).json({ error: "No conversation found" });
  }
};

const findUserByEmailOrUsername = async (request, response, next) => {
  let { user } = request.body;

  let userToAdd = await User.getUser(user);

  if (!userToAdd) {
    return response
      .status(400)
      .json("No user found with this username or email");
  }

  console.log(userToAdd);
  request.body.users = userToAdd;
  request.body.isDirectMessage = true;
  next();
};

module.exports = {
  createConversation,
  getConversationsByUser,
  getConversationById,
  findUserByEmailOrUsername,
};
