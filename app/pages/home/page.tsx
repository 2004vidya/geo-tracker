
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [safeRadius, setSafeRadius] = useState<number>(500);
  const [fullName, setFullName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ sourceAddress, destinationAddress }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to geocode addresses");
        setLoading(false);
        return;
      }

      const { source, destination } = data as {
        source: { lat: number; lon: number; display_name: string };
        destination: { lat: number; lon: number; display_name: string };
      };

      const params = new URLSearchParams({
        sourceLat: String(source.lat),
        sourceLng: String(source.lon),
        sourceAddr: source.display_name,
        destLat: String(destination.lat),
        destLng: String(destination.lon),
        destAddr: destination.display_name,
        safeRadius: String(safeRadius),
      });

      router.push(`/map?${params.toString()}`);
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#b6cba5] via-[#a8c097] to-[#9ab589] overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative pt-12 md:pt-20 pb-8 md:pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-[#1d4b19] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-3 md:mb-4 tracking-tight drop-shadow-lg">
            GEO-TRACKER
          </h1>
          <p className="text-[#1d4b19] font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Your way to safety
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="px-4 md:px-8 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            {/* Form Card */}
            <div className="bg-[#1d4b19] rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-1">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
                Plan Your Journey
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-lg text-red-100 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Source Address */}
                <div className="relative group">
                  <input
                    value={sourceAddress}
                    onChange={(e) => setSourceAddress(e.target.value)}
                    type="text"
                    name="floating_Source"
                    id="floating_Source"
                    className="block py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b-2 border-[#b6cba5]/50 appearance-none focus:outline-none focus:ring-0 focus:border-[#b6cba5] peer transition-colors"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_Source"
                    className="absolute text-sm sm:text-base text-[#b6cba5]/80 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#b6cba5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Source Address
                  </label>
                </div>

                {/* Destination Address */}
                <div className="relative group">
                  <input
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    type="text"
                    name="floating_Destination"
                    id="floating_Destination"
                    className="block py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b-2 border-[#b6cba5]/50 appearance-none focus:outline-none focus:ring-0 focus:border-[#b6cba5] peer transition-colors"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_Destination"
                    className="absolute text-sm sm:text-base text-[#b6cba5]/80 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#b6cba5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Destination Address
                  </label>
                </div>

                {/* Full Name */}
                <div className="relative group">
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b-2 border-[#b6cba5]/50 appearance-none focus:outline-none focus:ring-0 focus:border-[#b6cba5] peer transition-colors"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="absolute text-sm sm:text-base text-[#b6cba5]/80 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#b6cba5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Full Name
                  </label>
                </div>

                {/* Emergency Contact and Safe Radius Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      type="tel"
                      pattern="[0-9]{10}"
                      name="floating_phone"
                      id="floating_phone"
                      className="block py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b-2 border-[#b6cba5]/50 appearance-none focus:outline-none focus:ring-0 focus:border-[#b6cba5] peer transition-colors"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="absolute text-sm sm:text-base text-[#b6cba5]/80 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#b6cba5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Emergency Contact
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      value={safeRadius}
                      onChange={(e) => setSafeRadius(Number(e.target.value))}
                      type="number"
                      name="floating_company"
                      id="floating_company"
                      className="block py-3 px-0 w-full text-sm sm:text-base text-white bg-transparent border-0 border-b-2 border-[#b6cba5]/50 appearance-none focus:outline-none focus:ring-0 focus:border-[#b6cba5] peer transition-colors"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_company"
                      className="absolute text-sm sm:text-base text-[#b6cba5]/80 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#b6cba5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Safe Radius (meters)
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 w-full bg-[#b6cba5] hover:bg-[#a8c097] text-[#1d4b19] py-4 rounded-xl font-bold text-lg sm:text-xl md:text-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? "Loading..." : "Begin Your Journey"}
                </button>
              </form>
            </div>

            {/* Info Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 order-1 lg:order-2">
              <h2 className="text-[#1d4b19] text-2xl sm:text-3xl font-bold mb-6">
                Stay Safe, Stay Connected
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#1d4b19] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-[#1d4b19] font-bold text-lg sm:text-xl mb-2">
                      Real-time Tracking
                    </h3>
                    <p className="text-[#1d4b19]/70 text-sm sm:text-base">
                      Monitor your journey from start to finish with precise GPS tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#1d4b19] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-[#1d4b19] font-bold text-lg sm:text-xl mb-2">
                      Safety Radius
                    </h3>
                    <p className="text-[#1d4b19]/70 text-sm sm:text-base">
                      Set a safe zone around your route. Get alerts if you deviate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#1d4b19] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-[#1d4b19] font-bold text-lg sm:text-xl mb-2">
                      Emergency Contact
                    </h3>
                    <p className="text-[#1d4b19]/70 text-sm sm:text-base">
                      Your trusted contact will be notified if something goes wrong.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-[#1d4b19]/20">
                  <p className="text-[#1d4b19]/60 text-xs sm:text-sm italic">
                    "Safety isn't expensive, it's priceless. Travel with peace of mind."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
