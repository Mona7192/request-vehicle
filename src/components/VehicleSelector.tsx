import { useState, useEffect } from "react";
import { useVehicles } from "../hooks/useVehicles";
import { useAuth } from "../context/AuthContext";

interface VehicleSelectorProps {
  onSelect: (vehicleId: string | null) => void;
}

export default function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const { userToken } = useAuth();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // For debounce
  const [selectedVehicle, setSelectedVehicle] = useState<{ id: string; name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // search debounce
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading, error } = useVehicles(
    userToken!,
    debouncedSearch.length >= 2 ? debouncedSearch : ""
  );

  // When the input is empty, the selection is cleared
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
    setShowDropdown(false);
  };

  const handleClearSelection = () => {
    setSelectedVehicle(null);
    setSearch("");
    onSelect(null);
    setShowDropdown(false);
  };

  return (
    <div className="my-4 relative">
      <label className="block text-sm text-gray-700 mb-1">انتخاب نوع خودرو:</label>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="نوع ماشین آلات"
          className="bg-lime-50 text-gray-600 p-2 pr-9 rounded-lg w-full"
          onFocus={() => debouncedSearch.length >= 2 && setShowDropdown(true)}
        />

        {/* Delete Button */}
        {selectedVehicle && (
          <button
            type="button"
            onClick={handleClearSelection}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        )}
      </div>

      {/* Vehicle List */}
      {showDropdown && data?.data?.length > 0 && debouncedSearch.length >= 2 && (
        <ul className="absolute text-black bg-white rounded-lg w-full mt-1 max-h-48 overflow-auto z-10 shadow">
          {data.data.map((v) => (
            <li
              key={v.id}
              onMouseDown={() => handleSelect(String(v.id), v.name)}
              className={`cursor-pointer px-3 py-2 text-black hover:bg-yellow-50 ${
                selectedVehicle?.id === String(v.id) ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {v.name}
            </li>
          ))}
        </ul>
      )}

      {/* status */}
      {showDropdown && data?.data?.length === 0 && debouncedSearch.length >= 2 && !isLoading && (
        <p className="text-gray-500 text-sm mt-2 text-center">نتیجه‌ای یافت نشد.</p>
      )}
      {isLoading && <p className="text-black text-sm mt-2">در حال جستجو...</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
}
