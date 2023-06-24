import express from "express";
import multer from "multer";
import { multerCloud } from "../MW/multer-cloud.js";

export const router = express.Router();
//MW = MiddleWare
// telling Multer where to store local data
const localMW = multer({
  dest: "./assets",
});

// creating the middleware with this step for any type of files we want to add
const uploadImgMW = localMW.single("avatar");

const cloudMW = multerCloud.single("avatar");



router.post("/upload", uploadImgMW, (req, res) => {
  console.log(req.file);
  res.send("File sent");
});


router.post("/upload-cloud", cloudMW, (req,res) => {
    console.log(req.file);
    res.send("File sent to cloud");
})