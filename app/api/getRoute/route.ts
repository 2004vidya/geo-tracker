import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { source, destination } = await req.json();
    console.log("Received source:", source);
    console.log("Received destination:", destination);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?start=${source.lng},${source.lat}&end=${destination.lng},${destination.lat}`;
    console.log("OpenRouteService URL:", url);
    const res = await fetch(url, {
      headers: {
        Authorization: process.env.OPENROUTESERVICE_API_KEY || "",
      },
    });
    // const responseText = await res.text();
    // console.log("OpenRouteService response:", responseText);
    console.log("OpenRouteService response status:", res.status);
    const data = await res.json();
    console.log(data);
    debugger;

    const coords = data.features[0].geometry.coordinates;
    console.log(coords);
    debugger;

    const formatted = coords.map(([lng, lat]: number[]) => [lat, lng]);
    console.log(formatted);
    debugger;

    return NextResponse.json({
      ok: true,
      route: formatted,
      distance: data.features[0].properties.segments[0].distance,
      duration: data.features[0].properties.segments[0].duration,
    });
  } catch (err) {
    console.log("Routing error:", err);
    return NextResponse.json({ ok: false, error: err }, { status: 500 });
  }
}
