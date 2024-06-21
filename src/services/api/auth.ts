import { createMutation } from "../queries/client";
import { api } from "./base";

export const loginMutation = createMutation({
  mutationFn: (code: string) =>
    api
      .post<{ accessToken: string }>("/auth/login", { code })
      .then((response) => response.data),
});
