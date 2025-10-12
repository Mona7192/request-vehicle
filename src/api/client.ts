// src/api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://exam.pishgamanasia.com/webapi",
  headers: {
    "Content-Type": "application/json",
  },
});

// مدیریت خطا
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.Messages || "خطا در ارتباط با سرور";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
