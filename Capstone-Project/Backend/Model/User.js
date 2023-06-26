import { sha256 } from "js-sha256";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
  email: {
    type: String,
    required: "Email is required!",
  },
  password: {
    type: String,
    required: "Password is required!",
  },
});

userSchema.methods.validatePassword = function (password) {
  const hashedPassword = sha256(password + process.env.SALT);
  return hashedPassword === this.password;
};

export const User = mongoose.model("User", userSchema);
