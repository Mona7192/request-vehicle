import { useMutation } from "@tanstack/react-query";
import { type UseMutationResult } from "@tanstack/react-query";
import { sendRideRequest } from "../api/rideApi";
import type { RideRequestResponse } from "../types/apiTypes";

export interface SendRequestParams {
  userToken: string;
  vehicleUserTypeId: string;
  source: string;
  destination: string;
}

/**
 * Hook: useSendRequest
 * مدیریت ارسال درخواست سفر
 */
export const useSendRequest = (): UseMutationResult<
  RideRequestResponse,
  Error,
  SendRequestParams
> => {
  return useMutation<RideRequestResponse, Error, SendRequestParams>({
    mutationFn: async (params) => {
      try {
        if (import.meta.env.DEV)
          console.log("Sending ride request with params:", params);

        const response = await sendRideRequest(
          params.userToken,
          params.vehicleUserTypeId,
          params.source,
          params.destination
        );

        if (import.meta.env.DEV)
          console.log("API Response:", response);

        return response;
      } catch (err: any) {
        console.error("API Error:", err);
        throw new Error("ارسال درخواست با خطا مواجه شد");
      }
    },
  });
};
