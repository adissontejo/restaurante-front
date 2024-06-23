import { ItemResponseDTO } from "./item-response.dto";

export interface CategoriaResponseDTO {
  id: number;
  nome: string;
  itens: ItemResponseDTO[];
}
