import { createQuery } from "../queries/client";
import { api } from "./base";
import { CupomResponseDTO } from "./dtos/cupom-response.dto";

export const getCupomsQuery = createQuery(
  (usuarioId: number, restauranteId: number) => ({
    queryKey: ["cupons", usuarioId, restauranteId],
    queryFn: () =>
      api
        .get<CupomResponseDTO[]>("cupons", {
          params: { usuarioId, restauranteId },
        })
        .then((response) => response.data),
  })
);
