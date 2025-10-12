// src/api/rideApi.ts
import apiClient from "./client";

// انواع داده (Types)
export interface LoginResponse {
  status: number;
  message: string;
  data?: {
    userToken: string;
  };
}

export interface Vehicle {
  id: string;
  name: string;
}

export interface VehicleListResponse {
  status: number;
  message: string;
  data: Vehicle[];
}

export interface RideRequestResponse {
  status: number;
  message: string;
  data?: {
    requestNo: string;
  };
}

// Login API
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const { data } = await apiClient.post("/Account/Login", {
      Username: username,
      Password: password,
    });
    if (import.meta.env.DEV) console.log("Login response:", data);
    return data;
  } catch (err: any) {
    console.error("Login error:", err);
    throw new Error("خطا در ورود کاربر");
  }
};

// Get Vehicles API
export const getVehicles = async (
  userToken: string,
  searchTerm = "aa"
): Promise<VehicleListResponse> => {
  const term = searchTerm.length >= 2 ? searchTerm : "aa";
  try {
    const { data } = await apiClient.get("/Request/GetVehicleUsers", {
      params: {
        UserToken: userToken,
        SearchTerm: term,
      },
    });
    if (import.meta.env.DEV) console.log("Vehicles API response:", data);
    return data;
  } catch (err: any) {
    console.error("Vehicle fetch error:", err);
    throw new Error("خطا در دریافت لیست خودروها");
  }
};

// 🔹 Send Ride Request API
export const sendRideRequest = async (
  userToken: string,
  vehicleUserTypeId: string,
  source: string,
  destination: string
): Promise<RideRequestResponse> => {
  try {
    const { data } = await apiClient.post("/Request/SendRequest", {
      UserToken: userToken,
      VehicleUserTypeId: vehicleUserTypeId,
      Source: source,
      Destination: destination,
    });
    if (import.meta.env.DEV) console.log("Send Request API response:", data);
    return data;
  } catch (err: any) {
    console.error("Send Request error:", err);
    throw new Error("خطا در ارسال درخواست سفر");
  }
};
