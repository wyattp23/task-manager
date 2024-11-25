import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
  }
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
    } else if (error.response.status === 401) {
      window.location.href = "/login";
    } else if (error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(
      new ApiError(
        error.message || "An error occurred",
        error.response?.status || 500,
        error.response?.data
      )
    );
  }
);
