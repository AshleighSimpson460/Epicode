import express from "express";
import { PrivateMessage } from "../Model/PrivateMessages.js";
import setCurrentUser from "../MiddleWare/setCurrentUser.js";
import Auth from "../MiddleWare/Auth.js";
import { generatePrivateId } from "../utils/generatePrivateId.js"; // Import the generatePrivateId function
import mongoose from "mongoose";
import { PrivateChatMessage } from "../Model/PrivateChatMessage.js";

export const router = express.Router();

router.use(setCurrentUser);

router.get("/", Auth, async (req, res) => {
  const { chatId } = req.query;

  try {
    const privateMessage = await PrivateMessage.findOne({ chatId }).populate({
      path: "messages",
      populate: {
        path: "userId",
        model: "User",
        select: "name", // Select the name field of the user only
      },
      options: { sort: { timestamp: 1 } }, // Sort messages in ascending order based on timestamp
    });

    if (!privateMessage) {
      return res.status(404).json({ error: "Private chat not found" });
    }

    res.json(privateMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:userId", Auth, async (req, res) => {
  const { participants, message } = req.body; // Include "message" in the request body

  console.log("currentuser:", req.currentUser.id);

  try {
    const participantIds = participants.map(
      (participant) => new mongoose.Types.ObjectId(participant)
    );

    participantIds.sort();

    const chatId = generatePrivateId(participants[0], participants[1]);

    // Check if the private chat already exists with these participants
    const existingPrivateMessage = await PrivateMessage.findOne({
      participants: { $all: participantIds },
    });

    if (!existingPrivateMessage) {
      // Create a new private message only if it doesn't exist
      const newPrivateChatMessage = new PrivateChatMessage({
        chatId,
        userId: participantIds,
        message,
      });

      await newPrivateChatMessage.save();
    }

    res.json({ chatId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
