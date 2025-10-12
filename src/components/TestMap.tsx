import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function TestMap() {
  return (
    <MapContainer center={[29.6, 52.5]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://map.pishgamanasia.ir/tile/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

export default TestMap;
