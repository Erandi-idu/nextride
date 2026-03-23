import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, 
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};

export default connectDB;