

import connectDB from "../../lib/mongodb"; 
import Car from "../../../models/Car";      
import { NextResponse } from "next/server";

// Handle POST request (Save car)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newCar = await Car.create(body);
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Error saving car" }, { status: 500 });
  }
}

// Handle GET request (Fetch all cars)
export async function GET() {
  try {
    await connectDB();
    const cars = await Car.find({}).sort({ createdAt: -1 });
    return NextResponse.json(cars);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Error fetching cars" }, { status: 500 });
  }
}