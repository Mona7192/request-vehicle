// src/hooks/useVehicles.ts
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../api/rideApi";
import type { VehicleListResponse } from "../types/apiTypes";


/**
 * Hook: useVehicles
 * گرفتن لیست خودروها با React Query و TypeScript
 * شامل مدیریت cache، خطا، و وضعیت بارگذاری
 */
export const useVehicles = (userToken: string, searchTerm = "aa") => {
  return useQuery<VehicleListResponse, Error>({
    queryKey: ["vehicles", userToken, searchTerm.trim()],
    queryFn: async () => {
      if (import.meta.env.DEV) {
        console.log(" Fetching vehicles for:", { userToken, searchTerm });
      }

      const response = await getVehicles(userToken, searchTerm);

      if (response.status !== 1) {
        throw new Error(response.message || "دریافت خودروها ناموفق بود");
      }

      return response;
    },
    enabled: Boolean(userToken), // فقط وقتی کاربر لاگین کرده
    staleTime: 1000 * 60 * 3, // کش سه دقیقه‌ای برای بهینه‌سازی
    retry: 1, // فقط یک بار تلاش مجدد در صورت خطا
  });
};
