import mongoose from "mongoose";

const articleBody = mongoose.Schema({
    category: String,
    title: String,
    cover: String,
    readTime: Object,
    author: Object,
    content: String,
    createdAt: Date,
});

export const article = mongoose.model("article", articleBody);