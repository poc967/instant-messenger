import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_base_url}`, {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("connect_error", (err) => {
  console.log(err);
});
