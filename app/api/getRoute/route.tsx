import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {source,destination } = await req.json();
        console.log("Received source:", source);
console.log("Received destination:", destination);

        const url = `http://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
        console.log("OSRM URL:", url);
        const res = await fetch(url);
        console.log("OSRM response status:", res.status);
        const data = await res.json();
        console.log(data);
        

        const coords = data.routes[0].geometry.coordinates;
        console.log(coords);

        const formatted = coords.map(([lng, lat]: number[]) => [lat, lng]);
        console.log(formatted);

        return NextResponse.json({
            ok:true,
            route:formatted,
            distance:data.routes[0].distance,
            duration:data.routes[0].distance,
        })


    } catch (err) {
        return NextResponse.json({ ok: false, error: err }, { status: 500 });
    }
}