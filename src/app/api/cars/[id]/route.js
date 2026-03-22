import connectDB from "../../../lib/mongodb"; 
import Car from "../../../../models/Car";     
import { NextResponse } from "next/server";

// Handle DELETE request
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Car.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}