import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: String,
  createdOn: String,
  role: String,
});

export const User = mongoose.model("users", userSchema);
