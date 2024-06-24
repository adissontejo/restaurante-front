import { createMutation, createQuery, queryClient } from "../queries/client";
import { api } from "./base";
import { CreateFuncionarioDTO } from "./dtos/create-funcionario.dto";
import { FuncionarioResponseDTO } from "./dtos/funcionario-response.dto";
import { UpdateFuncionarioDTO } from "./dtos/update-funcionario.dto";

export const funcionarioQuery = createQuery(
  (restauranteId: number, usuarioId?: number) => ({
    queryKey: ["funcionarios", restauranteId, usuarioId],
    queryFn: () =>
      api
        .get<FuncionarioResponseDTO[]>("/funcionarios", {
          params: { restauranteId, usuarioId },
        })
        .then((response) => response.data),
  })
);

export const createFuncionarioMutation = createMutation({
  mutationFn: (data: CreateFuncionarioDTO) =>
    api
      .post<FuncionarioResponseDTO>("/funcionarios", data)
      .then((response) => response.data)
      .then((data) => {
        queryClient.invalidateQueries({
          queryKey: ["funcionarios", data.restauranteId],
        });

        return data;
      }),
});

export const updateFuncionarioMutation = createMutation({
  mutationFn: ({
    id,
    funcionario,
  }: {
    id: number;
    funcionario: UpdateFuncionarioDTO;
  }) =>
    api
      .put<FuncionarioResponseDTO>(`/funcionarios/${id}`, funcionario)
      .then((response) => response.data)
      .then((data) => {
        queryClient.invalidateQueries({
          queryKey: ["funcionarios", data.restauranteId],
        });

        return data;
      }),
});

export const deleteFuncionarioMutation = createMutation({
  mutationFn: (id: number) =>
    api
      .delete<void>(`/funcionarios/${id}`)
      .then((response) => response.data)
      .then((data) => {
        queryClient.invalidateQueries({
          queryKey: ["funcionarios"],
        });

        return data;
      }),
});
