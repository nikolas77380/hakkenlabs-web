import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 150000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // Placeholder for future auth token
  // const token = getTokenFromStore();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling hook (can route to Sentry later)
    return Promise.reject(error);
  },
);

export default axiosInstance;
