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
  })
    .select("firstName")
    .exec();

  let newConversation = await new Conversation({
    members: users,
    isDirectMessage,
    messages: [],
  });

  if (!newConversation) {
    return response
      .status(400)
      .json({ message: "the conversation could not be created" });
  } else {
    newConversation.save();
    return response
      .status(201)
      .json({
        message: "conversation created successfully",
        data: newConversation.id,
      });
  }
};

module.exports = { createConversation };
