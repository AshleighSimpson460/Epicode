import express from "express";
import { User } from "../Model/User.js";
import catchErrors from "../Handlers/catchErrors.js";
import sha256 from "js-sha256";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

export const router = express.Router();

router.use(bodyParser.json({ type: "*/*" }));

router.post(
  "/login",
  catchErrors(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
      });

      if (!user) throw "Invalid email or password";

      const token = jwt.sign({ id: user.id }, process.env.SECRET);
      res.status(200).json({
        message: "User logged in successfully!",
        token: token,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid email or password" });
    }
  })
);

router.post(
  "/register",
  catchErrors(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || name.length < 3) {
      throw new Error("Name must be provided and longer than 3 characters.");
    }

    const emailReg = /@/;

    if (!emailReg.test(email)) {
      throw new Error("Email must have an '@'");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("Email already in use.");
    }

    try {
      const user = new User({
        name,
        email,
        password: sha256(password + process.env.SALT),
      });

      await user.save();

      res.status(200).json({ message: "Registration successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
);
