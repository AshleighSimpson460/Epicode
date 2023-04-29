import express from "express";
import DataJson from "../DataJson.js";
import { PostBody } from "../model/body.js";

export const router = express.Router();

router.get("/", (req, res) => {
  console.log(`request to ${req.method} has been acknowledged`);
  res.setHeader("Content-Type", "application/json");
  PostBody.find({}).then((body) => {
    res.send(JSON.stringify(body));
  });
});

router.post("/", (req, res) => {
  const PostData = req.body;

  const newPost = new PostBody({
    category: new String,
    title: new String,
    cover: new String,
    readTime: new Object,
    author: new Object,
    content: new String,
    createdAt: new Date(),
    updatedAt: new Date(),
    // make sure to provide the following fields in the request body:
    //  name, phone, numberOfPeople, smoking, dateTime, specialRequests
    ...PostData,
  });
  newPost.save();
  res.send("Posted!");
});

router.put("/:postsId", async (req, res) => {
  const PostData = req.body

  const updatePost = await PostBody.updateOne({
    _id: req.params.postsId
  },{...PostData, updatedAt: new Date()});
  console.log(`${updatePost}`,`PostId: ${req.params.postsId}`)
  res.send("Post has been updated.");
})

router.delete("/:postsId", async (req, res) => {
  // deleteOne is an asynchronous operation
  // just as any other operation that communicates with the database
  // so we await it otherwise the response will be sent before the operation is finished
  const deleteFew  = await PostBody.deleteOne({
    _id: req.params.postsId,
  });
  res.send(`Deleted ${deleteFew} Post(s)`);
});
