const express = require("express");
const conversationRouter = express.Router();
const passport = require("../helpers/passport");
const { checkForAuthentication } = require("../helpers/auth");
const {
  createConversation,
  getConversationsByUser,
} = require("../controllers/conversation");

conversationRouter.post("/", checkForAuthentication, createConversation);
conversationRouter.get("/", checkForAuthentication, getConversationsByUser);

module.exports = conversationRouter;
