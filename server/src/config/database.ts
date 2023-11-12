import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/coursehub");
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.log(error);
  }
};
