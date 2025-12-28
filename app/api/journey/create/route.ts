import { connectDB } from "@/lib/db";
import journey from "@/models/journey.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

  const {
    sourceLat,
    sourceLng,
    destLat,
    destLng,
    sourceAddr,
    destAddr,
    userId,
  } = await req.json();

  const newJourney = await journey.create({
    userId: userId || "temp_user_id",
    source: {
      lat: sourceLat,
      long: sourceLng,
      address: sourceAddr,
    },
    destination: {
      lat: sourceLat,
      long: sourceLng,
      address: sourceAddr,
    },
    startedAt: new Date()
  });

  console.log("Journey created",newJourney._id);

  return NextResponse.json({
    success:true,
    journeyId:newJourney._id
  })
    
  } catch (error) {
    console.error("❌ Journey creation error:", error);
    return NextResponse.json({ error: "Failed to create journey" }, { status: 500 }); 
  }
}
