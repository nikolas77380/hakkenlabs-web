import axios, { AxiosInstance } from "axios";

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) return "/api"; // fallback for local proxy
  return url;
}

export function createHttpClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    // Placeholder for future auth token
    // const token = getTokenFromStore();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Centralized error handling hook (can route to Sentry later)
      return Promise.reject(error);
    },
  );

  return instance;
}

export const http = createHttpClient();
