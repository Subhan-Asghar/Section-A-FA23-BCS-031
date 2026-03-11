import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Student");

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
};