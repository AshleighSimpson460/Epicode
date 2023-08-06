import express from "express";
import { restaurant } from "../Model/Restaurant.js";
import bodyParser from "body-parser";

export const router = express.Router();

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
