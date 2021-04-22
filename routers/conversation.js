const express = require("express");
const conversationRouter = express.Router();
const passport = require("../helpers/passport");
const { checkForAuthentication } = require("../helpers/auth");
const {
  createConversation,
  getConversationsByUser,
  getConversationById,
  findUserByEmailOrUsername,
} = require("../controllers/conversation");

conversationRouter.post(
  "/",
  checkForAuthentication,
  findUserByEmailOrUsername,
  createConversation
);
conversationRouter.get("/", checkForAuthentication, getConversationsByUser);
conversationRouter.get(
  "/:identifier",
  checkForAuthentication,
  getConversationById
);

module.exports = conversationRouter;
