import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 


const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas successfully connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default ConnectDB;
