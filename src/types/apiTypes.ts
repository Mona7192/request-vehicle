// src/types/apiTypes.ts

/** User login response */
export interface LoginResponse {
  status: number;
  message: string;
  data?: {
    userToken: string;
  };
}

/** Vehicle data model */
export interface Vehicle {
  id: string | number;
  name: string;
}

/** Response to receiving the list of cars */
export interface VehicleListResponse {
  status: number;
  message: string;
  data: Vehicle[];
}

/** Travel request input */
export interface SendRequestParams {
  userToken: string;
  vehicleUserTypeId: string;
  source: string;
  destination: string;
}

/** Travel request registration response */
export interface RideRequestResponse {
  status: number;
  message: string;
  data?: {
    requestNo: string;
  };
}
