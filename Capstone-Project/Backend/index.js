import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jwt-then";
import http from "http";

import { router as restaurantRouter } from "./Routes/router.js";
import { router as userRouter } from "./Routes/user.js";
import { router as chatroomRouter } from "./Routes/chatroom.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use("/restaurantPosts", restaurantRouter);
app.use("/user", userRouter);
app.use("/chat", chatroomRouter);

mongoose
  .connect(process.env.MongoConnect)
  .then(() => console.log("connected to MongoDB"))
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log(`server is running on port ${process.env.Port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

server.listen(process.env.CHAT_PORT, () => {
  console.log(`Chat server is running on port ${process.env.CHAT_PORT}`);
});

io.on("connection", (Socket) => {
  console.log("connected:" + Socket.userId);

  Socket.on("disconnect", () => {
    console.log("Disconnected: " + Socket.userId);
  });
});
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Connected from server side");
});

app.all("*", (req, res) => {
  res.statusCode = 400;
  res.send("Path not found");
});
