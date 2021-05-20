const express = require("express");
const messageRouter = express.Router();
const { createMessage, markMessagesAsRead } = require("../controllers/message");
const { checkForAuthentication } = require("../helpers/auth");

messageRouter.post("/", checkForAuthentication, createMessage);
messageRouter.put(
  "/markMessagesAsRead/:identifier",
  checkForAuthentication,
  markMessagesAsRead
);

module.exports = messageRouter;
