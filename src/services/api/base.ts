import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshMutation } from "./auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!(error instanceof AxiosError)) {
      throw error;
    }

    const config = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw error;
        }

        const { accessToken } = await refreshMutation.execute(refreshToken);

        localStorage.setItem("accessToken", accessToken);

        return api(config);
      } catch (err) {
        throw error;
      }
    }
  }
);
