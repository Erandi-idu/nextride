import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {

    await mongoose.connect("mongodb://nextuser:pass123@ac-ycjchng-shard-00-00.bnxkbbc.mongodb.net:27017,ac-ycjchng-shard-00-01.bnxkbbc.mongodb.net:27017,ac-ycjchng-shard-00-02.bnxkbbc.mongodb.net:27017/?ssl=true&replicaSet=atlas-13r752-shard-0&authSource=admin&appName=Cluster0");
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log("DB Connection Error:", error);
  }
};

export default connectDB;