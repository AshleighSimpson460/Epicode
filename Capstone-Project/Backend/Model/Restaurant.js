import mongoose from "mongoose";
import express from "express";

export const router = express.Router();

const restaurantPostSchema = new mongoose.Schema({
  name: String,
  cuisine: Array,
  type: String,
  contact: {
    phone: String,
    email: String,
  },
  Average: Number,
  imgURL: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export const restaurant = mongoose.model("restaurant", restaurantPostSchema);
