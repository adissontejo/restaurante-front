import { api } from "./base";
import { CreateRestauranteDTO } from "./dtos/create-restaurante";
import { serialize } from "object-to-formdata";
import { createMutation, createQuery } from "../queries/client";
import { RestauranteDTO } from "./dtos/restaurante";

export const restauranteByDominioQuery = createQuery((dominio?: string) => ({
  staleTime: 10 * 60 * 1000,
  queryKey: ["restaurante", "by-dominio", dominio],
  queryFn: () =>
    api
      .get<RestauranteDTO>(`/restaurantes/by-dominio/${dominio}`)
      .then((response) => response.data)
      .catch(() => null),
  enabled: (dominio && dominio.length >= 3) || false,
}));

export const createRestauranteMutation = createMutation({
  mutationFn: (restaurante: CreateRestauranteDTO) => {
    const formData = serialize(restaurante, {
      indices: true,
    });

    return api
      .post<RestauranteDTO>("/restaurantes", formData)
      .then((response) => response.data)
      .then((data) => {
        restauranteByDominioQuery.params(data.dominio).invalidate();

        return data;
      });
  },
});
