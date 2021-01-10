const express = require("express");
const conversationRouter = express.Router();
const passport = require("../helpers/passport");
const { checkForAuthentication } = require("../helpers/auth");
const { createConversation } = require("../controllers/conversation");

conversationRouter.post("/", checkForAuthentication, createConversation);

module.exports = conversationRouter;
