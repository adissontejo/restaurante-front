import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ViacepCepResponseDTO } from "./dtos/viacep-cep-response";

export const viacepApi = axios.create({
  baseURL: "https://viacep.com.br/",
});

export const cepQuery = (cep: string) => {
  const numericCep = cep.replace(/\D/g, "");

  return queryOptions({
    queryKey: ["cep", cep],
    queryFn: () =>
      viacepApi
        .get<ViacepCepResponseDTO>(`/ws/${numericCep}/json`)
        .then((response) => response.data)
        .then((data) =>
          data["erro" as keyof ViacepCepResponseDTO] ? null : data
        ),
    enabled: numericCep.length === 8,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
