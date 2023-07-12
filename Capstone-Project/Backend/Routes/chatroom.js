import express from "express";
import bodyParser from "body-parser";

import catchErrors from "../Handlers/catchErrors.js";
import Auth from "../MiddleWare/Auth.js";
import { Chatroom } from "../Model/Chatroom.js";

export const router = express.Router();

router.use(bodyParser.json({ type: "*/*" }));

router.get(
  "/",
  Auth,
  catchErrors(async (req, res) => {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
  })
);

router.post(
  "/",
  Auth,
  catchErrors(async (req, res) => {
    const { name } = req.body;

    const nameReg = /^[A-Za-z]\s+$/;

    if (nameReg.test(name)) throw "Chatroom name can only contain letters";

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) throw "Chatroom with this name already exists";

    const chatroom = new Chatroom(req.body);

    await chatroom.save();

    res.json({
      message: "Chatroom created!",
    });
  })
);
