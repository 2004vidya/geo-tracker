import { NextRequest, NextResponse } from "next/server";

type GeoCodeResult = {
  lat: string;
  lon: string;
  display_name: string;
};

async function geocodeAddress(
  address: string
): Promise<{ lat: number; lon: number; display_name: string } | null> {
  const q = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "GeoSafetyBubble/1.0 (your-email@example.com)",
      "Accept-Language": "en",
    },
  });
  if (!res.ok) return null;
  console.log("Nominatim response status:", res.status);

  const data: GeoCodeResult[] = await res.json();
  console.log("Nominatim data for address:", address, "->", data);
  if (!data || data.length === 0) return null;

  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    display_name: data[0].display_name,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sourceAddress, destinationAddress } = body as {
      sourceAddress: string;
      destinationAddress: string;
    };
    console.log("Received addresses:", { sourceAddress, destinationAddress });

    if (!sourceAddress || !destinationAddress) {
      return NextResponse.json(
        { error: "Both source and destination are required" },
        { status: 400 }
      );
    }

    // Geocode source first
    const src = await geocodeAddress(sourceAddress);

    // Wait 1 second to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Then geocode destination
    const dst = await geocodeAddress(destinationAddress);

    if (!src || !dst) {
      return NextResponse.json(
        {
          error:
            "Failed to geocode one or both addresses. Try more specific address.",
        },
        { status: 422 }
      );
    }
    console.log("Geocoding results:", { src, dst });

    return NextResponse.json({
      source: src,
      destination: dst,
    });
  } catch (err) {
    console.error("Geocode error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
