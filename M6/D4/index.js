import express from "express";
import mongoose from "mongoose";
import { router as blogRouter } from "./Routes/router.js";
import { router as commentRouter } from "./Model/comment.js";
import { router as blogSchemaRouter } from "./Model/blog.js";
const app = express();

app.use("/blogPosts", blogRouter);
app.use("/blogs", blogSchemaRouter);
app.use("/comment", commentRouter);

mongoose
  .connect(process.env.Mongoose_Key)
  .then(() => console.log("connecting is done"))
  .then(() => {
    app.listen(3002);
  });

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("I am connected from server side");
});

app.all("*", (req, res) => {
  res.statusCode = 404;
  res.send("Not found");
});
