const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const userRouter = require("./routers/user");
const conversationRouter = require("./routers/conversation");
const messageRouter = require("./routers/message");
const dotenv = require("dotenv").config();

// Connection to MongoDB -----------------------
mongoose.connect(process.env.db_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

if (process.env.NODE_ENV === "development") {
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("Database connected!");
  });

  connection.on("error", (error) => {
    console.log("Connection error:", error);
  });
}

// -----------------------------------------------

app.use(express.json());
app.use(
  session({ secret: "supersecret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
