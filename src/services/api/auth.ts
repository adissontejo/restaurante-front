import axios from "axios";
import { createMutation } from "../queries/client";

const unauthenticatedApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const loginMutation = createMutation({
  mutationFn: (code: string) =>
    unauthenticatedApi
      .post<{ accessToken: string; refreshToken: string }>("/auth/login", {
        code,
      })
      .then((response) => response.data),
});

export const refreshMutation = createMutation({
  mutationFn: (refreshToken: string) =>
    unauthenticatedApi
      .post<{ accessToken: string }>("/auth/refresh", { refreshToken })
      .then((response) => response.data),
});
