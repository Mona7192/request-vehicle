// src/component/MapPicker.tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface LatLng {
  lat: number;
  lng: number;
}

interface MapPickerProps {
  userToken: string;
  onSourceSelect: (coords: LatLng) => void;
  onDestinationSelect: (coords: LatLng) => void;
}

export default function MapPicker({ onSourceSelect, onDestinationSelect }: MapPickerProps) {
  const [source, setSource] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [selecting, setSelecting] = useState<"source" | "destination">("source");
  const [instruction, setInstruction] = useState("روی نقشه کلیک کنید تا مبدا انتخاب شود");

  useEffect(() => {
    if (source && !destination) setInstruction("اکنون روی نقشه کلیک کنید تا مقصد انتخاب شود");
    else if (destination)
      setInstruction("برای تغییر، دوباره روی نقشه کلیک کنید تا مبدا جدید انتخاب شود");
  }, [source, destination]);

  const sourceIcon = L.icon({
    iconUrl: "/marker-icon-red.png",
    iconSize: [32, 50],
    iconAnchor: [16, 50],
    shadowUrl: "/marker-shadow.png",
  });

  const destinationIcon = L.icon({
    iconUrl: "/marker-icon-green.png",
    iconSize: [32, 50],
    iconAnchor: [16, 50],
    shadowUrl: "/marker-shadow.png",
  });

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (selecting === "source") {
          setSource(e.latlng);
          onSourceSelect(e.latlng);
          setSelecting("destination");
        } else {
          setDestination(e.latlng);
          onDestinationSelect(e.latlng);
          setTimeout(() => setSelecting("source"), 0);
        }
      },
    });
    return null;
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      {/* Map */}
      <MapContainer
        center={[29.6, 52.5]}
        zoom={13}
        className="w-5/6 h-[85%] m-auto"
        zoomControl={true}
      >
        <TileLayer url="https://map.pishgamanasia.ir/tile/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {source && <Marker position={source} icon={sourceIcon} />}
        {destination && <Marker position={destination} icon={destinationIcon} />}
      </MapContainer>

      
      <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-gray-800 text-sm px-4 py-2 rounded-full shadow-md z-[1000]">
        {instruction}
      </div>
    </div>
  );
}
