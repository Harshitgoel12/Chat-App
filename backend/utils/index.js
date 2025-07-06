const express = require("express");
const router = require("../Routers/User.Router");
const ChatRouter = require("../Routers/Chat.Router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { UserConnected, UserDisconnected } = require("./lib");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map();


io.on("connection", (socket) => {
  console.log(" New socket connected:", socket.id);

  socket.on("add-user", (userId) => {
    socket.userId = userId;
    onlineUsers.set(userId, socket.id);
    UserConnected(socket.id, userId); 
    console.log(` User ${userId} added to online list`);
  });

  
  socket.on("send-msg", (data) => {
    const receiverSocketId = onlineUsers.get(data.to || data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("msg-receive", {
        from: data.from,
        to: data.to,
        message: data.message,
        file: data.file || null,
        fileType: data.fileType || null,
      });
    } else {
      console.log(" Receiver not online");
    }
  });


  socket.on("disconnect", () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      UserDisconnected(socket.userId); 
      
    }
  });
});


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1", router);
app.use("/api/v1", ChatRouter);

module.exports = { app, server };
