import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("error in ConnectMongoDB:", error.message);
  }
};

export default ConnectMongoDB;
