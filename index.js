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
const path = require("path");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// models
const { Conversation } = require("./models/conversation");
const { Socket } = require("dgram");
const { disconnect } = require("process");

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
  origin:
    process.env.NODE_ENV === "production"
      ? "https://enigmatic-springs-23614.herokuapp.com"
      : "http://localhost:3000",
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
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/user", userRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

// connect to socket handler
io.on("connect", async (socket) => {
  socket.on("userOnline", async () => {
    let currentUser = socket.handshake.auth.userId;

    // fetch a list of conversation id's belonging to the user attached
    // to the newly connected socket
    const roomsToJoin = await Conversation.getAllConversationIdByUser(
      socket.handshake.auth.userId
    );

    // join all the users conversations
    socket.join(roomsToJoin);

    // get all connected sockets across the application
    let sockets = await io.of("/");
    let usersOnline = [];
    // iterate over the list of all sockets currently connected
    // and create a new array of the chat rooms they belong to to send to
    // the client
    sockets = sockets.sockets.forEach(({ rooms, handshake }) => {
      if (socket.handshake.auth.userId !== handshake.auth.userId) {
        let user = {
          rooms: [],
          user: null,
        };
        rooms.forEach((room) => {
          user.rooms.push(room);
        });
        user.user = handshake.auth.userId;

        return usersOnline.push(user);
      }
    });

    // notify other users of online status
    socket.broadcast.emit("userOnline", currentUser);

    // send onlineUsers to newly connected socket
    socket.emit("users", usersOnline);
  });

  socket.on("private message", ({ message, conversation }) => {
    socket.to(conversation).emit("private message", {
      message,
      conversation,
    });
  });

  socket.on("disconnect", async () => {
    socket.broadcast.emit("userOffline", socket.handshake.auth.userId);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build", "index.html"));
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
