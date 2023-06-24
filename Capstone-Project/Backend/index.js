import express from "express";
import mongoose from "mongoose";
import { router as restaurantRouter } from "./Routes/router.js";

const app = express();

app.use("/restaurantPosts", restaurantRouter);

mongoose
  .connect(
    "mongodb+srv://ashleighsimpson2016:bNDFO9rkHwCpDfTt@capstone.h2qmeam.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to backend"))
  .then(() => {
    app.listen(3002);
  });

app.get("/", (res, req) => {
  res.statusCode = 200;
  res.send("Connected from server side");
});

app.all("*", (req, res) => {
  res.statusCode = 400;
  res.send("Path not found");
});
