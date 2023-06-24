import mongoose from "mongoose";
import express from "express";

export const router = express.Router();

const commentSchema = mongoose.Schema({
    author: String,
    content: String,
    avatarUrl: String,
    createdAt: {type: Date, default: Date.now()}
});

export const Comment = mongoose.model("Comment", commentSchema);