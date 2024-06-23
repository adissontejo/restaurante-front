import { api } from "./base";
import { serialize } from "object-to-formdata";
import { createMutation, createQuery } from "../queries/client";
import { RestauranteResponseDTO } from "./dtos/restaurante-response.dto";
import { CreateRestauranteDTO } from "./dtos/create-restaurante.dto";
import { UpdateRestauranteDTO } from "./dtos/update-restaurate.dto";

export const restaurantesQuery = createQuery({
  staleTime: 10 * 60 * 1000,
  queryKey: ["restaurantes"],
  queryFn: () =>
    api
      .get<RestauranteResponseDTO[]>("/restaurantes")
      .then((response) => response.data),
});

export const restauranteByDominioQuery = createQuery((dominio?: string) => ({
  staleTime: 10 * 60 * 1000,
  queryKey: ["restaurante", "by-dominio", dominio],
  queryFn: () =>
    api
      .get<RestauranteResponseDTO>(`/restaurantes/by-dominio/${dominio}`)
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
      .post<RestauranteResponseDTO>("/restaurantes", formData)
      .then((response) => response.data)
      .then((data) => {
        restauranteByDominioQuery.params(data.dominio).invalidate();

        return data;
      });
  },
});

export const updateRestauranteMutation = createMutation({
  mutationFn: ({
    id,
    restaurante,
  }: {
    restaurante: UpdateRestauranteDTO;
    id: number;
  }) => {
    const formData = serialize(restaurante, {
      indices: true,
    });

    return api
      .put<RestauranteResponseDTO>(`/restaurantes/${id}`, formData)
      .then((response) => response.data)
      .then((data) => {
        restauranteByDominioQuery.params(data.dominio).invalidate();

        return data;
      });
  },
});
