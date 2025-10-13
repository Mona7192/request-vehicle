import { useState, useEffect } from "react";
import MapPicker from "./MapPicker";
import VehicleSelector from "./VehicleSelector";
import { useSendRequest } from "../hooks/useSendRequest";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface LatLng {
  lat: number;
  lng: number;
}

export default function RideRequestForm() {
  const [source, setSource] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const { userToken } = useAuth();
  const { mutate: sendRequest, isLoading, data, error } = useSendRequest();

  useEffect(() => {
    if (data?.status === 1 && data?.data?.requestNo) {
      toast.success(`درخواست با موفقیت ثبت شد (شماره: ${data.data.requestNo})`);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(`خطا در ارسال درخواست: ${error.message}`);
    }
  }, [error]);

  const handleSubmit = () => {
    if (!source || !destination || !vehicleId) {
      toast.error("لطفاً مبدا، مقصد و نوع خودرو را انتخاب کنید");
      return;
    }

    sendRequest({
      userToken: userToken!,
      vehicleUserTypeId: vehicleId,
      source: `${source.lat},${source.lng}`,
      destination: `${destination.lat},${destination.lng}`,
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0">
        <MapPicker
          userToken={userToken || ""}
          onSourceSelect={setSource}
          onDestinationSelect={setDestination}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white md:w-1/3 mx-auto rounded-t-3xl shadow-[0_-2px_20px_rgba(0,0,0,0.15)] px-6 py-5 flex flex-col items-center">
        <div className="md:flex justify-between w-full text-[13px] sm:text-sm text-gray-700 font-medium mb-3">
          <div className="flex items-center gap-1">
            <span className="text-red-600">مبدا:</span>
            <span className="text-red-600">
              {source ? `${source.lat.toFixed(6)}, ${source.lng.toFixed(6)}` : "—"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600">مقصد:</span>
            <span className="text-green-600">
              {destination ? `${destination.lat.toFixed(6)}, ${destination.lng.toFixed(6)}` : "—"}
            </span>
          </div>
        </div>

        <div className="w-full mb-3">
          <VehicleSelector onSelect={setVehicleId} />
        </div>

        {/* Submit request button */}
        <button
          disabled={!source || !destination || !vehicleId || isLoading}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold text-black text-lg transition-all duration-200 ${
            !source || !destination || !vehicleId || isLoading
              ? "bg-yellow-400 opacity-70 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-[#ffcc00] shadow-md hover:shadow-lg"
          }`}
        >
          {isLoading ? "در حال ارسال..." : "ثبت درخواست"}
        </button>
      </div>
    </div>
  );
}
