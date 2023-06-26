import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
});

export const Chatroom = mongoose.model("Chatroom", chatroomSchema);
