import { createQuery } from "../queries/client";
import { api } from "./base";
import { CategoriaResponseDTO } from "./dtos/categoria-response.dto";

export const categoriasQuery = createQuery((restauranteId: number) => ({
  queryKey: ["categorias", "by-restaurante", restauranteId],
  queryFn: () =>
    api
      .get<CategoriaResponseDTO[]>("/categorias", { params: { restauranteId } })
      .then((response) => response.data),
}));
