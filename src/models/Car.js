import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: String,
  year: String,
  description: String,
  image: String, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);