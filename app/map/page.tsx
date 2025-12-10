"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const LeafletMap = dynamic<any>(
  () =>
    import("../components/LeafletMap") as unknown as Promise<
      React.ComponentType<any>
    >,
  { ssr: false }
);

const MapView = () => {
  const searchParams = useSearchParams();

  const sourceLat = Number(searchParams.get("sourceLat"));
  const sourceLng = Number(searchParams.get("sourceLng"));
  const destLat = Number(searchParams.get("destLat"));
  const destLng = Number(searchParams.get("destLng"));
  const safeRadius = Number(searchParams.get("safeRadius") || "500");
  const sourceAddr = searchParams.get("sourceAddr") || "";
  const destAddr = searchParams.get("destAddr") || "";

  const [route, setRoute] = useState<number[][]>([]);

  useEffect(() => {

    async function getRoute(){

      const source = {
      lat: sourceLat,
      lng: sourceLng,
    };

    const destination = {
      lat: destLat,
      lng: destLng,
    };

      const res = await fetch("/api/getRoute",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({source,destination}),
      });

      const data = await res.json();
      if(data.ok){
        setRoute(data.route);
      }  
    }

    getRoute();
  
    
  }, [sourceLat, sourceLng, destLat, destLng])
  

  if (
    isNaN(sourceLat) ||
    isNaN(sourceLng) ||
    isNaN(destLat) ||
    isNaN(destLng)
  ) {
    return (
      <div className="p-6">
        Invalid coordinates. Please go back and re-enter addresses.
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <LeafletMap
        sourceLat={sourceLat}
        sourceLng={sourceLng}
        destLat={destLat}
        destLng={destLng}
        safeRadius={safeRadius}
        sourceAddr={sourceAddr}
        destAddr={destAddr}
        route={route}
      />
    </div>
  );
};

export default MapView;
