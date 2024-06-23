import { createMutation, createQuery } from "../queries/client";
import { api } from "./base";
import { UpdateUsuarioDTO } from "./dtos/update-usuario.dto";
import { UsuarioResponseDTO } from "./dtos/usuario-response.dto";

export const usuarioLogadoQuery = createQuery(() => ({
  queryKey: ["usuario", "me", localStorage.getItem("token")],
  queryFn: () =>
    api
      .get<UsuarioResponseDTO>("/usuarios/me")
      .then((response) => response.data),
})).params();

export const updateUsuarioMutation = createMutation({
  mutationFn: ({ id, usuario }: { id: number; usuario: UpdateUsuarioDTO }) =>
    api
      .put<UsuarioResponseDTO>(`/usuarios/${id}`, usuario)
      .then((response) => response.data)
      .then((data) => {
        usuarioLogadoQuery.invalidate();

        return data;
      }),
});
