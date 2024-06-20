import { queryOptions, useMutation } from "@tanstack/react-query";
import { api } from "./base";
import { CreateRestauranteDTO } from "./dtos/create-restaurante";
import { serialize } from "object-to-formdata";

export const restauranteByDominioQuery = (dominio: string) =>
  queryOptions({
    staleTime: 10 * 60 * 1000,
    queryKey: ["restaurante", "by-dominio", dominio],
    queryFn: () =>
      api
        .get(`/restaurantes/by-dominio/${dominio}`)
        .then((response) => response.data)
        .catch(() => null),
    enabled: dominio.length >= 3,
  });

export const useCreateRestauranteMutation = () =>
  useMutation({
    mutationFn: (restaurante: CreateRestauranteDTO) => {
      const formData = serialize(restaurante, {
        indices: true,
      });

      return api
        .post("/restaurantes", formData)
        .then((response) => response.data);
    },
  });
