const express = require("express");
const messageRouter = express.Router();
const { createMessage } = require("../controllers/message");
const { checkForAuthentication } = require("../helpers/auth");

messageRouter.post("/", checkForAuthentication, createMessage);

module.exports = messageRouter;
