import express from "express";
import { article } from "../model/body.js";
import posts from "../Data/posts.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(posts));
});

router.post("/", (req, res) => {
  res.setHeader("Content-Type","application/json");
  const Data = req.body;

  const newData = new article({
    category: new String(),
    title: new String(),
    cover: new String(),
    readTime: new Object(),
    author: new Object(),
    content: new String(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...Data,
  });
  newData.save();
  res.send("new Post has been sent");
});

router.put("/:dataId", async (req, res) => {
    const Data = req.body

    const updateData = await article.updateOne({
        _id: req.params.dataId
    },{ ...Data, updatedAt: new Date()});
    console.log(`${updateData}`, `dataId: ${req.params.dataId}`);
    res.send("Post has been updated");
})

router.delete("/:dataId", async(req, res) => {
    const deleteData = await article.deleteOne({
        _id: req.params.dataId
    });
    res.send(`Deleted ${deleteData}`);
})