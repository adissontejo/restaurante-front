import { createQuery } from "../queries/client";
import { api } from "./base";
import { FuncionarioResponseDTO } from "./dtos/funcionario-response.dto";

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
