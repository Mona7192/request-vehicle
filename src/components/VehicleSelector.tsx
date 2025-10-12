import { useState, useEffect } from "react";
import { useVehicles } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";

interface VehicleSelectorProps {
  onSelect: (vehicleId: string | null) => void;
}

export default function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const { userToken } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<{ id: string; name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading, error } = useVehicles(userToken!, search.length >= 2 ? search : "");

  // وقتی input خالی شد، انتخاب پاک می‌شه
  useEffect(() => {
    if (search === "") {
      setSelectedVehicle(null);
      onSelect(null);
      setShowDropdown(false);
    }
  }, [search, onSelect]);

  const handleSelect = (id: string, name: string) => {
    setSelectedVehicle({ id, name });
    setSearch(name);
    onSelect(id);
    setShowDropdown(false); // لیست بسته بشه
  };

  return (
    <div className="my-4 relative">
      <label className="block text-sm text-gray-700 mb-1">انتخاب نوع خودرو:</label>

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="نوع ماشین آلات"
        className="bg-lime-50 text-gray-600 p-2 rounded-lg w-full"
        onFocus={() => search.length >= 2 && setShowDropdown(true)}
      />

      {/* لیست ماشین‌ها */}
      {showDropdown && data?.data?.length > 0 && search.length >= 2 && (
        <ul className="absolute text-black bg-white rounded-lg w-full mt-1 max-h-48 overflow-auto z-10 shadow">
          {data.data.map((v) => (
            <li
              key={v.id}
              onMouseDown={() => handleSelect(String(v.id), v.name)} // استفاده از onMouseDown
              className={`cursor-pointer px-3 py-2 text-black last:border-none hover:bg-yellow-50 ${
                selectedVehicle?.id === String(v.id) ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {v.name}
            </li>
          ))}
        </ul>
      )}

      {/* اگر هیچ نتیجه‌ای نبود */}
      {showDropdown && data?.data?.length === 0 && search.length >= 2 && !isLoading && (
        <p className="text-gray-500 text-sm mt-2 text-center">نتیجه‌ای یافت نشد.</p>
      )}

      {isLoading && <p className="text-black text-sm mt-2">در حال جستجو...</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
}
