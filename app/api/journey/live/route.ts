import { connectDB } from "@/lib/db";
import Journey from "@/models/journey.model";
import { NextResponse } from "next/server";
import { isDeviated } from "@/utils/detectDeviation";

export async function POST(req: Request) {
  await connectDB();
  console.log("Db connected");
  const { lat, long } = await req.json();

  const journeyId = "678ddbc1cd44aa376b31f9a8";

  const journey = await Journey.findById(journeyId);
  console.log("journey found :", journey);
  if (!journeyId) return NextResponse.json({ error: "Journey not found " });
  journey.liveLocationUpdates.push({ lat, long });
  console.log("journey updated :", journey);
  if (
    journey.plannedRoute.length > 0 &&
    isDeviated(lat, long, journey.plannedRoute)
  ) {
    journey.deviationDetected = true;
  }
  await journey.save();

   return NextResponse.json({
    deviated: journey.deviationDetected,
  });
}
