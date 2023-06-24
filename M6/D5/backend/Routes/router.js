import express from "express";
import { Comment } from "../Model/comment.js";
import { multerCloud } from "../MW/multer-cloud.js";
import cors from "cors";
import { blog } from "../Model/blog.js";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";
import { User } from "../Model/users.js";

export const router = express.Router();

router.use(cors());

const LMW = (request, _, next) => {
  console.log(`${request.method} request to ${request.path} has arrived`);

  next();
};

const cloudMW = multerCloud.single("avatar");

router.use(LMW);
router.use(bodyParser.json({ type: "*/*" }));

router.get("/", async (req, res) => {
  const blogPost = await blog.find();
  res.json(blogPost);
});

router.get("/blog/:id/comments", async (req, res) => {
  const blogPost = await blog.findById(req.params.id).populate("comments");
  res.json(blogPost.comments);
});

sgMail.setApiKey(
  "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"
);

router.post("/blog/:id/comments", async (req, res) => {
  const blogPost = await blog.findById(req.params.id).populate("comments");

  const commentData = {
    content: req.body.content,
    author: req.body.author,
    createdAt: Date.now(),
  };

  const comment = new Comment(commentData);
  await comment.save();

  blogPost.comments.push(comment);

  await blogPost.save();
  await comment.populate("author");

  const { author, content } = req.body;

  const email = "sirak22082@aicogz.com";

  const msg = {
    to: email,
    from: "sirak22082@aicogz.com", //temp email replace to see if it works or not.
    subject: "New Blog Post",
    text: `Your blog post has been published ${author} has been published. Here is the content ${content}`,
  };

  await sgMail.send(msg)

  res.status(200).json(comment);
});

router.patch("/authors/:authorId/avatar", cloudMW, async (req, res) => {
  console.log(req.file);
  const avatarUrl = req.file.path;
  const authorId = req.params.authorId;

  const updatedAuthor = await Comment.findByIdAndUpdate(
    authorId,
    { avatarUrl },
    { new: true }
  );

  res.json(updatedAuthor);

  res.send("File sent to cloud");
});

router.post("/register", async (req, res) => {
  const newUser = await User.create(req.body);

  const msg = {
    to: newUser.email,
    from: 'sirak22082@aicogz.com',
    subject: 'Thank you for signing up',
    text: `Dear ${newUser.name}, thank you for signing up! `
  }
  await sgMail.send(msg);

  res.status(200).json({ message: 'registration successful' })
})