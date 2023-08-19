import mongoose from "mongoose";

const privateChatMessageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const PrivateChatMessage = mongoose.model(
  "PrivateChatMessage",
  privateChatMessageSchema
);
