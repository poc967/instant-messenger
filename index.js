const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user");
const conversationRouter = require("./routers/conversation");
const messageRouter = require("./routers/message");
const dotenv = require("dotenv").config();
const cors = require("cors");
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// models
const { Conversation } = require("./models/conversation");

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

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  session({
    secret: process.env.cookie_secret,
    cookie: { secure: false },
    saveUninitialized: true,
    resave: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

io.on("connection", async (socket) => {
  console.log("a user connected");

  const roomsToJoin = await Conversation.getAllConversationIdByUser(
    socket.handshake.auth.userId
  );

  socket.join(roomsToJoin);

  socket.on("private message", ({ message, conversation }) => {
    socket.to(conversation).emit("private message", {
      message,
      conversation,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

httpServer.listen(8080, () => {
  console.log("Listening on port 8080...");
});
