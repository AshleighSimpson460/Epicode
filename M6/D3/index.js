import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import { router as Data } from "./routes/router.js";

const app = express();

//LMW = LoggingMiddleWare
const LMW = (request, _, next) => {
  console.log(`${request.method} request to ${request.path} has arrived`);

  next();
};


//BPMW = BodyParserMiddleWare

app.use("/D3", Data);
app.use(LMW);
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(
    "mongodb+srv://ashleighsimpson2016:YHIZ5C8y28mhvwBR@d1epicode.ql48cwm.mongodb.net/test"
  )
  .then(() => console.log("connecting is done"))
  .then(() => {
    app.listen(3002);
  });

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("I am connected from server side");
});



app.all("*", (req, res) => {
    res.statusCode = 404;
    res.send("Not found");
  });