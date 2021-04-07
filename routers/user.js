const express = require("express");
const userRouter = express.Router();

const { createUser } = require("../controllers/user");
const passport = require("../helpers/passport");
const { logout } = require("../helpers/auth");

userRouter.post(
  "/",
  createUser,
  passport.authenticate("local"),
  (request, response) => {
    return response.status(201).json(request.user);
  }
);

userRouter.post(
  "/login",
  passport.authenticate("local"),
  (request, response) => {
    return response.status(200).json(request.user);
  }
);

userRouter.get("/logout", logout);

userRouter.get(
  "/",
  async (request, response, next) => {
    const isAuth = request.isAuthenticated();
    if (isAuth) {
      next();
    } else {
      return response.status(401).json({ error: "not authed for endpoint" });
    }
  },
  (request, response) => {
    return response.send(request.user);
  }
);

module.exports = userRouter;
