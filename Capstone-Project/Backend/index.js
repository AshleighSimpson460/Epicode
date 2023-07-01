import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { router as restaurantRouter } from "./Routes/router.js";
import { router as userRouter } from "./Routes/user.js";
import { router as chatroomRouter } from "./Routes/chatroom.js";

dotenv.config();

const app = express();

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

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Connected from server side");
});

app.all("*", (req, res) => {
  res.statusCode = 400;
  res.send("Path not found");
});
