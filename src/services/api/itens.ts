import { serialize } from "object-to-formdata";
import { createMutation, createQuery, queryClient } from "../queries/client";
import { api } from "./base";
import { CreateItemDTO } from "./dtos/create-item.dto";
import { ItemResponseDTO } from "./dtos/item-response.dto";
import { UpdateItemDTO } from "./dtos/update-item.dto";

export const getItemQuery = createQuery((id: number) => ({
  queryKey: ["item", id],
  queryFn: () =>
    api.get<ItemResponseDTO>(`/itens/${id}`).then((response) => response.data),
}));

export const createItemMutation = createMutation({
  mutationFn: (item: CreateItemDTO) => {
    const data = serialize(item, {
      indices: true,
    });

    return api
      .post<ItemResponseDTO>("/itens", data)
      .then((response) => response.data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });

        return data;
      });
  },
});

export const updateItemMutation = createMutation({
  mutationFn: ({ item, id }: { item: UpdateItemDTO; id: number }) => {
    const data = serialize(item, {
      indices: true,
      allowEmptyArrays: true,
    });

    return api
      .put<ItemResponseDTO>(`/itens/${id}`, data)
      .then((response) => response.data)
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });

        return data;
      });
  },
});
