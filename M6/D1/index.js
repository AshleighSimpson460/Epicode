import express from "express"
import mongoose from "mongoose" //ORM
import bodyParser from "body-parser"

import { router as DataRouter } from "./routers/routes.js"

/* Below is how to add the object to MongoDB (_id & _fields? are already added)

const filename = mongoose.Schema({
  name: string,
  phone: string,
  number: number,
  yes or no: boolean
})

export filename.model("filename", file)

filename.save() = saves item to the database

Middleware is a function that looks like the following: const middleware = (req, res, next) => {
  console.log(${req.method})
  next();
}

you can use it to make an authorisation middleware 

const authorisationMW = (req, res, next) => {
  let authorisation = req.headers.authorization

  if (authorisation === 'supersecretpassword'){
    console.log("authorisation passed");
    next()
  } else{
    res.status(403"forbidden").send("Not authorised");
  }
}

if middleware does not need to go further down the chain you do not need 'next' as a parameter in the function

*/

const server = express();

const bodyParserMW = bodyParser.json({type: "*/*"});

const FirstMiddleware = (request, _, next) => {
  console.log(`${request.method} request to ${request.path} has arrived`);

  next();
};


mongoose
  .connect("mongodb+srv://ashleighsimpson2016:YHIZ5C8y28mhvwBR@d1epicode.ql48cwm.mongodb.net/test")
  .then(() => console.log("connecting is done"))
  .then(() => {
    server.listen(3002)
  })
  
server.get("/", (req, res) => {
  res.statusCode = 200;
  res.send('Hello from server');
});

server.use("/Posts", DataRouter)
server.use(FirstMiddleware)
server.use(bodyParserMW)

  

// server.put('/posts', (req, res) => {
//   console.log('request to /posts has been acknowledged',DataJson);
//   res.setHeader("Content-Type","application/json");
//   res.send(JSON.stringify(DataJson));
// })

// server.delete('/posts', (req, res) => {
//   console.log('request to /posts has been acknowledged',DataJson);
//   res.setHeader("Content-Type","application/json");
//   res.send(JSON.stringify(DataJson));
// })

//YHIZ5C8y28mhvwBR