import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import http from "http";
import { Server } from "socket.io";

import { router as restaurantRouter } from "./Routes/router.js";
import { router as userRouter } from "./Routes/user.js";
import { router as chatroomRouter } from "./Routes/chatroom.js";
import { router as messageRouter } from "./Routes/Messages.js";

import { Messages } from "./Model/Message.js";
import { User } from "./Model/User.js";
import { PrivateMessages } from "./Model/PrivateMessages.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/restaurantPosts", restaurantRouter);
app.use("/user", userRouter);
app.use("/groupchats", chatroomRouter);
app.use("/groupchats/:chatId", messageRouter);

mongoose
  .connect(process.env.MongoConnect)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

server.listen(process.env.Port, () => {
  console.log(`Server is running on port ${process.env.Port}`);
});

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Connected from server side");
});

app.all("*", (req, res) => {
  res.statusCode = 400;
  res.send("Path not found");
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    console.log("token:" + token);
    if (!token) {
      throw new Error("no token provided");
    }
    const payload = await jwt.verify(token, process.env.SECRET);
    console.log("payload: " + payload);
    socket.userId = payload.id;
    next();
  } catch (err) {
    next(new Error("Authentication error:" + err.message));
  }
});

const privateChatrooms = new Map();

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatId }) => {
    if (privateChatrooms.has(chatId)) {
      socket.join(chatId);
      console.log(`Private chat with: ${chatId} has started.`);
    } else {
      socket.join(chatId);
      console.log(`${chatId} has joined the groupchat`);
    }
  });

  socket.on("leaveRoom", ({ chatId }) => {
    if (privateChatrooms.has(chatId)) {
      socket.leave(chatId);
      console.log(`Private chat with: ${chatId} has ended`);
    } else {
      socket.leave(chatId);
      console.log(`${chatId} has left the groupchat`);
    }
  });

  socket.on("chatroomMessage", async ({ chatId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Messages({
        chatroom: chatId,
        user: socket.userId,
        message,
      });
      io.to(chatId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });

      await newMessage.save();
    }
  });

  socket.on("startPrivateMessages", async ({ userId1, userId2 }) => {
    const chatId = generatePrivateMessagesId(userId1, userId2);

    const privateChat = new PrivateMessages({
      chatId,
      userIds: [userId1, userId2],
    });

    await privateChat.save();

    socket.to(userId1).emit("privateChatRoomCreated", { chatId });
    socket.to(userId2).emit("privateChatRoomCreated", { chatId });
  });
});
