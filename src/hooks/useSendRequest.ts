// src/hooks/useSendRequest.ts
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { sendRideRequest } from "../api/rideApi";
import type { RideRequestResponse, SendRequestParams } from "../types/apiTypes";

export const useSendRequest = () => {
  return useMutation<RideRequestResponse, Error, SendRequestParams>({
    mutationFn: useCallback(async (params: { userToken: string; vehicleUserTypeId: string; source: string; destination: string; }) => {
      if (import.meta.env.DEV) console.log("Sending ride request:", params);

      const response = await sendRideRequest(
        params.userToken,
        params.vehicleUserTypeId,
        params.source,
        params.destination
      );

      if (response.status !== 1) {
        throw new Error(response.message || "ارسال درخواست ناموفق بود");
      }

      return response;
    }, []),
  });
};
