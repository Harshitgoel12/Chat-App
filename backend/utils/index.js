const express = require("express");
const router = require("../Routers/User.Router");
const ChatRouter = require("../Routers/Chat.Router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { UserConnected, UserDisconnected } = require("./lib");
require("dotenv").config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN, 
    credentials: true,
    methods: ["GET", "POST","PUT","PATCH","DELETE"],
  },
});

const onlineUsers = new Map();


io.on("connection", (socket) => {

  socket.on("add-user", (userId) => {
    socket.userId = userId;
    onlineUsers.set(userId, socket.id);
    UserConnected(socket.id, userId); 
  
  });

  socket.on("CallToUser",(data)=>{
    const socketId=onlineUsers.get(data.CallToUser);
    if(socketId){
    io.to(socketId).emit("CallToUser",{
        signal:data.signal,
          myID:data.myID,
          userName:data.userName,
          ProfilePic:data.ProfilePic,
    })
    }else{
      console.log("user is not present")
    }
  })

  socket.on("rejectCall",(data)=>{
      const socketId= onlineUsers.get(data.CallerID);
      if(socketId){
        io.to(socketId).emit("rejectCall",{
          data:"call is rejected"
        })
      }
  })

  socket.on("AnswerCall",(data)=>{
            const socketId=onlineUsers.get(data.CallToUser);
       
            if(socketId){
            io.to(socketId).emit("AnswerCall",{
              signal:data.signal,
              CallerId:data.myID,
              receiverName:data.userName,
              receiverPic:data.ProfilePic,
            })
            }
            else{
              console.log("socket id present hi nhi hai caller ki to m kya kru")
            }
     
  })

  socket.on("CallEnded",(data)=>{
    const OtherSocketId= onlineUsers.get(data.Other);
    if(OtherSocketId){
      io.to(OtherSocketId).emit("CallEnded",{
        value:"call is ended"
      });
    }
  })

  
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
  origin: process.env.ORIGIN,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1", router);
app.use("/api/v1", ChatRouter);

module.exports = { app, server };
