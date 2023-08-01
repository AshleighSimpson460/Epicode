import mongoose from "mongoose";

const privateMessagesSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

export const PrivateMessage = mongoose.model(
  "PrivateMessage",
  privateMessagesSchema
);
