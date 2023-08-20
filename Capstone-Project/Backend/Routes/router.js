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

  try {
    // Save the reservation
    const newReservation = new Reservation({
      date: new Date(date),
      time: new Date(time),
      guests: parseInt(guests),
    });

    await newReservation.save();

    // Fetch participants' names
    const participantsNames = await User.find(
      { _id: { $in: participants } },
      "name"
    );

    res
      .status(200)
      .json({ message: "Reservation confirmed", participantsNames });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    res.status(500).json({ error: "Server error" });
  }
});
