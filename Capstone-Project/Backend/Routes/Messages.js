import express from "express";
import bodyParser from "body-parser";

import { Chatroom } from "../Model/Chatroom.js";
import { Messages } from "../Model/Message.js";
import { User } from "../Model/User.js";
import { Server } from "socket.io";

import catchErrors from "../Handlers/catchErrors.js";
import Auth from "../MiddleWare/Auth.js";

export const router = express.Router();

router.use(bodyParser.json({ type: "*/*" }));

router.post(
  "/:chatId",
  Auth,
  catchErrors(async (req, res) => {
    try {
      const { chatId } = req.params;
      const { message } = req.body;

      const user = await User.findOne({ _id: req.user.id });
      const chatroom = await Chatroom.findOne({ _id: chatId });

      const newMessage = new Messages({
        chatroom: chatroom._id,
        user: user._id,
        message: message,
      });

      await newMessage.save();

      Server.to(chatId).emit("newMessage", newMessage);

      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while sending this message" });
    }
  })
);
