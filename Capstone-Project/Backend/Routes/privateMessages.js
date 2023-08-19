import express from "express";
import setCurrentUser from "../MiddleWare/setCurrentUser.js";
import Auth from "../MiddleWare/Auth.js";
import mongoose from "mongoose";

import { PrivateMessage } from "../Model/PrivateMessages.js";
import { User } from "../Model/User.js";
import { generatePrivateId } from "../utils/generatePrivateId.js"; // Import the generatePrivateId function
import { PrivateChatMessage } from "../Model/PrivateChatMessage.js";

export const router = express.Router();

router.use(setCurrentUser);

router.get("/:userId", Auth, async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all conversations where the given userId is a participant
    const conversations = await PrivateMessage.find({
      participants: { $in: [userId] },
    })
      .populate({
        path: "participants",
        model: "User",
        select: "name",
      })
      .populate({
        path: "messages",
        populate: {
          path: "userId",
          model: "User",
          select: "name",
        },
        options: { sort: { timestamp: 1 } },
      });

    res.json({ conversations });
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
    const participantsNames = await User.find(
      { _id: { $in: participantIds } },
      "name"
    );

    res.json({ chatId, participantsNames });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
