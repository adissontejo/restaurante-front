import { createQuery } from "../queries/client";
import { api } from "./base";

export const usuarioLogadoQuery = createQuery(() => ({
  queryKey: ["usuario", "me", localStorage.getItem("token")],
  queryFn: () => api.get("/usuarios/me").then((response) => response.data),
})).params();
