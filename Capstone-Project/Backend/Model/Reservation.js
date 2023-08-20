import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
