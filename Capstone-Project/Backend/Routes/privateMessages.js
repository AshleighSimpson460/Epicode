import express from "express";
import { PrivateMessage } from "../Model/PrivateMessages.js";
import { Messages } from "../Model/Message.js";

import Auth from "../MiddleWare/Auth.js";

export const router = express.Router();

router.get("/personal", Auth, async (req, res) => {
  const { chatId } = req.params;

  try {
    const privateMessage = await PrivateMessage.findOne({ chatId }).populate(
      "participants",
      "user"
    );
    if (!privateMessage) {
      return res.status(404).json({ error: "Private chat not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:chatId", Auth, async (req, res) => {
  const { chatId, message, userId } = req.body;

  const newMessage = new Messages({
    chatroom: chatId,
    user: userId,
    message,
  });
  await newMessage.save();

  io.to(chatId).emit("newMessage", {
    message,
    name: userId,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  res.json({ message: "Private message sent successfully" });
});
