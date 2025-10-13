import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://exam.pishgamanasia.com/webapi",
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handling with appropriate Persian message
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.Messages || error.message || "خطا در ارتباط با سرور";
    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
