import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as restaurantRouter } from "./Routes/router.js";
import { router as userRouter } from "./Routes/user.js";
import { router as chatroomRouter } from "./Routes/chatroom.js";

dotenv.config();

const app = express();

app.use("/restaurantPosts", restaurantRouter);
app.use("/user", userRouter);
app.use("/chat", chatroomRouter);

mongoose
  .connect(process.env.MongoConnect)
  .then(() => console.log("connected to backend"))
  .then(() => {
    app.listen(process.env.Port);
  });

app.get("/", (res, req) => {
  res.statusCode = 200;
  res.send("Connected from server side");
});

app.all("*", (req, res) => {
  res.statusCode = 400;
  res.send("Path not found");
});
