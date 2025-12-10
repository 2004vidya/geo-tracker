"use client";
import { Icon } from "leaflet";
import React from "react";
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

interface MapProps {
  sourceLat: number;
  sourceLng: number;
  destLat: number;
  destLng: number;
  safeRadius: number;
  sourceAddr?: string;
  destAddr?: string;
  route:number[][];
}

const markerIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LeafletMap({
  sourceLat,
  sourceLng,
  destLat,
  destLng,
  safeRadius,
  sourceAddr,
  destAddr,
  route,
}: MapProps) {
  const centerLat = sourceLat;
  const centerLng = sourceLng;

  return(
    <MapContainer center={[centerLat, centerLng]} zoom={13} className="w-full h-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[sourceLat, sourceLng]} icon={markerIcon}>
        <Popup>{sourceAddr || "Source"}</Popup>
      </Marker>

      <Marker position={[destLat, destLng]} icon={markerIcon}>
        <Popup>{destAddr || "Destination"}</Popup>
      </Marker>

      <Circle
        center={[sourceLat, sourceLng]}
        radius={safeRadius}
        pathOptions={{ color: "blue", fillColor: "lightblue", fillOpacity: 0.2 }}
      />

       {/* Routing polyline */}
      {route.length > 0 && (
        <Polyline positions={route} />
      )}
    </MapContainer>
  )
}
