import express from "express";
import sample from "../Data/sample.js";
import { pageSize } from "../Config/pagesize.js";
import { SampleBody } from "../model/body.js";
import bodyParser from "body-parser";

export const router = express.Router();
const LMW = (request, _, next) => {
  console.log(`${request.method} request to ${request.path} has arrived`);

  next();
};

router.use(bodyParser.json({ type: "*/*" }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(LMW)





router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(sample));
});

router.get("/isActive", async (req, res) => {
  // const filteredDoc = sample.filter(doc => doc.isActive === true);

  const filteredDoc = await SampleBody.find({ isActive: { $eq: true } });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(filteredDoc));
});

router.get("/greaterThan", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const greaterThan = await SampleBody.find({ age: { $gt: 26 } });

  res.send(JSON.stringify(greaterThan));
});

router.get("/lessThanEqual", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const lessThanEqual = await SampleBody.find(
    { age: { $gt: 26 } },
    { age: { $lte: 30 } }
  );

  res.send(JSON.stringify(lessThanEqual));
});

router.get("/blueorbrown", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const lessThanEqual = await SampleBody.find(
    { eyeColor: { $in: ["brown","blue"] } }
  );

  res.send(JSON.stringify(lessThanEqual));
});

router.get("/notgreen", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const notgreen = await SampleBody.find(
    { eyeColor: { $ne: "green" } }
  );

  res.send(JSON.stringify(notgreen));
});

router.get("/notgorb", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const notgorb = await SampleBody.find(
    { eyeColor: { $nin: ["green","blue"] } }
  );

  res.send(JSON.stringify(notgorb));
});

router.get("/email", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const email = await SampleBody.find(
    { company: "FITCORE" }, { email: 1, _id: 0 }
  );

  res.send(JSON.stringify(email));
});


router.post("/", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const newData = new SampleBody(req.body);
    await newData.save();

    res.status(200).send("Data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while saving data");
  }
});

// router.post("/:dataId", async (req, res) => {
//   const data = req.body.dataId;

//   const updateData = await SampleBody.updateOne(
//     {
//       _id: req.params.dataId,
//     },
//     { ...data, updatedAt: new data() });
//     console.log(`${updateData}`, `dataId: ${req.params.dataId}`);
//     res.send("post sent")
// });
