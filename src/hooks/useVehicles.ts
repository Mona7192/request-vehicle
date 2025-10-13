// src/hooks/useVehicles.ts
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getVehicles } from "../api/rideApi";
import type { VehicleListResponse } from "../types/apiTypes";

export const useVehicles = (userToken: string, searchTerm = "aa") => {
  const fetchVehicles = useCallback(async (): Promise<VehicleListResponse> => {
    if (import.meta.env.DEV) console.log("Fetching vehicles for:", { userToken, searchTerm });

    const response = await getVehicles(userToken, searchTerm);

    if (response.status !== 1) throw new Error(response.message || "دریافت خودروها ناموفق بود");

    return response;
  }, [userToken, searchTerm]);

  return useQuery<VehicleListResponse, Error>({
    queryKey: ["vehicles", userToken, searchTerm.trim()],
    queryFn: fetchVehicles,
    enabled: Boolean(userToken),
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });
};
