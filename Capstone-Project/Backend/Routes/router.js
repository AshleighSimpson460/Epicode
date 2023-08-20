import express from "express";
import setCurrentUser from "../MiddleWare/setCurrentUser.js";
import bodyParser from "body-parser";
import Auth from "../MiddleWare/Auth.js";

import { restaurant } from "../Model/Restaurant.js";
import { Reservation } from "../Model/Reservation.js";
import { User } from "../Model/User.js";

export const router = express.Router();

router.use(setCurrentUser);

const loggingMiddleWare = (req, _, next) => {
  console.log(`${req.method} request to ${req.path} has arrived`);
  next();
};

router.use(bodyParser.json({ type: "*/*" }));
router.use(loggingMiddleWare);

router.get("/", (req, res) => {
  restaurant
    .find()
    .then((restaurants) => {
      res.json(restaurants);
    })
    .catch((error) => {
      console.log("An error has occurred", error);
      res.status(500).send("An error occurred while fetching restaurants.");
    });
});

router.get("/my-reservations", Auth, async (req, res) => {
  const user = req.currentUser.id;
  try {
    const userReservations = await Reservation.find({
      user, // Use currentUser.id to find user's reservations
    });

    res.json(userReservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", (req, res) => {
  const newPost = new restaurant(req.body);

  newPost
    .save()
    .then(() => {
      res.send("Your post request was successfully sent to the database!");
    })
    .catch((error) => {
      console.error("Error saving the post:", error);
      res.status(500).send("An error occurred while saving the post.");
    });
});

router.post("/reservation", Auth, async (req, res) => {
  const { date, time, guests } = req.body;

  try {
    // Save the reservation
    const newReservation = new Reservation({
      date: new Date(date),
      time: new Date(time),
      guests: parseInt(guests),
      user: req.currentUser.id, // Associate reservation with the current user
    });

    await newReservation.save();

    res.status(200).json({ message: "Reservation confirmed" });
  } catch (error) {
    console.error("Error confirming reservation:", error);
    res.status(500).json({ error: "Server error" });
  }
});
