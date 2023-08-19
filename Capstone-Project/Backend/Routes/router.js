import express from "express";
import setCurrentUser from "../MiddleWare/setCurrentUser.js";
import bodyParser from "body-parser";
import Auth from "../MiddleWare/Auth.js";
import mongoose from "mongoose";

import { restaurant } from "../Model/Restaurant.js";
import { Reservation } from "../Model/Reservation.js";
import { PrivateChatMessage } from "../Model/PrivateChatMessage.js";
import { io, dotenv } from "../index.js";
import { generatePrivateId } from "../utils/generatePrivateId.js";
import { PrivateMessage } from "../Model/PrivateMessages.js";
import { User } from "../Model/User.js";

export const router = express.Router();

router.use(setCurrentUser);

// const automatedMessageToken = process.env.AUTOMATED_MESSAGE_TOKEN;
const automatedAccountId = "64d902e241e0e7f38f90eeda";

const loggingMiddleWare = (req, _, next) => {
  console.log(`${req.method} request to ${req.path} has arrived`);
  next();
};

router.use(bodyParser.json({ type: "*/*" }));
router.use(loggingMiddleWare);

router.get("/", (req, res) => {
  restaurant
    .find()
    .then((restaraunts) => {
      res.json(restaraunts);
    })
    .catch((error) => {
      console.log("An error has occured", error);
      res.status(500).send("An error occurred while fetching restaurants.");
    });
});

router.post("/", (req, res) => {
  const newPost = new restaurant(req.body);

  newPost
    .save()
    .then(() => {
      res.send("your post request was successfully sent to the database!");
    })
    .catch((error) => {
      console.error("Error saving the post:", error);
      res.status(500).send("An error occured while saving the post.");
    });
});

router.post("/reservation", Auth, async (req, res) => {
  const { date, time, guests, participants } = req.body;
  console.log("Received data:", req.body);

  const chatId = generatePrivateId(participants[0], participants[1]);

  try {
    const newReservation = new Reservation({
      date: new Date(date),
      time: new Date(time),
      guests: parseInt(guests),
    });

    await newReservation.save();

    // Send confirmation message to user's inbox
    const confirmationMessage = {
      userId: req.currentUser.id, // Assuming this is already an ObjectId
      name: "Automated Message",
      message: `Your reservation for ${date} at ${time} for ${guests} guests has been confirmed.`,
      timestamp: new Date().toISOString(),
    };

    // Save the automated confirmation message as a private message
    console.log("req.currentUser.id:", req.currentUser.id);
    console.log("automated:", automatedAccountId);

    // Convert participant IDs to ObjectId instances
    const participantIds = participants.map(
      (participant) => new mongoose.Types.ObjectId(participant)
    );

    participantIds.sort();

    console.log("received participants:", participantIds);

    // Create an array of user IDs including the current user and automated account
    const userIds = [
      new mongoose.Types.ObjectId(req.currentUser.id),
      new mongoose.Types.ObjectId("64d902e241e0e7f38f90eeda"),
    ];

    // Check if the private chat already exists with these participants
    const existingPrivateMessage = await PrivateMessage.findOne({
      participants: { $all: userIds },
    });

    if (!existingPrivateMessage) {
      // Create the automated message using the userIds array if it doesnt exist
      const automatedMessage = new PrivateChatMessage({
        chatId,
        userId: userIds,
        message: confirmationMessage.message,
      });

      await automatedMessage.save();
    }
    const participantsNames = await User.find(
      { _id: { $in: participantIds } },
      "name"
    );

    res
      .status(200)
      .json({ message: "Reservation confirmed", chatId, participantsNames });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    res.status(500).json({ error: "Server error" });
  }
});
