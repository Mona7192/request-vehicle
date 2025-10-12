// src/types/apiTypes.ts

/** 🔹 پاسخ لاگین کاربر */
export interface LoginResponse {
  status: number;
  message: string;
  data?: {
    userToken: string;
  };
}

/** 🔹 مدل داده خودرو */
export interface Vehicle {
  id: string | number;
  name: string;
}

/** 🔹 پاسخ دریافت لیست خودروها */
export interface VehicleListResponse {
  status: number;
  message: string;
  data: Vehicle[];
}

/** 🔹 ورودی درخواست سفر */
export interface SendRequestParams {
  userToken: string;
  vehicleUserTypeId: string;
  source: string;
  destination: string;
}

/** 🔹 پاسخ ثبت درخواست سفر */
export interface RideRequestResponse {
  status: number;
  message: string;
  data?: {
    requestNo: string;
  };
}
