import { serialize } from "object-to-formdata";
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
  mutationFn: ({ id, usuario }: { id: number; usuario: UpdateUsuarioDTO }) => {
    const formData = serialize(usuario, {
      indices: true,
    });

    return api
      .put<UsuarioResponseDTO>(`/usuarios/${id}`, formData)
      .then((response) => response.data)
      .then((data) => {
        usuarioLogadoQuery.invalidate();

        return data;
      });
  },
});

export const getUsuarioByEmailQuery = createQuery((email: string) => ({
  queryKey: ["usuario", "by-email", email],
  queryFn: () =>
    api
      .get<UsuarioResponseDTO>(`/usuarios/by-email/${email}`)
      .then((response) => response.data)
      .catch(() => null),
}));
