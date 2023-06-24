import express from "express";
import { Comment} from "../Model/comment.js";
import bodyParser from "body-parser";
import { blog } from "../Model/blog.js";

export const router = express.Router();

const LMW = (request, _, next) => {
    console.log(`${request.method} request to ${request.path} has arrived`);
  
    next();
  };

  router.use(bodyParser.json({type: "*/*" }));
  router.use(LMW);

  router.post("/blog/:id/comments", async (req, res) => {
    const blogPost = await blog.findById(req.params.id).populate('comments');
  
    const commentData = {
      content: req.body.content,
      author: req.body.author,
      createdAt: Date.now(),
    };
  
    const comment = new Comment(commentData);
    await comment.save();
  
    blogPost.comments.push(comment);
  
    await blogPost.save();
    await comment.populate('author');
  
    res.status(200).json(comment);
  });
  
  router.put('/blog/:id/comments/:commentId', async (req, res) => {

      const blogPost = await blog.findById(req.params.id);
      const comment = await Comment.findById(req.params.commentId);
  
      comment.content = req.body.content;
      comment.author = req.body.author;
      comment.createdAt = Date.now();

      blogPost.comments.push(comment);
      await comment.save();
  
      res.json(comment);
  });

  router.get('/blog/:id/comments', async (req, res) => {
    const blogPost = await blog.findById(req.params.id).populate('comments');
    res.json(blogPost.comments);
});