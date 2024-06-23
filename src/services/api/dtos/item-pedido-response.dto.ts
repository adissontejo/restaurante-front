import { InstanciaItemWithItemResponseDTO } from "./instancia-item-response.dto";
import { RespostaCampoFormularioResponseDTO } from "./resposta-campo-formulario-response.dto";

export interface ItemPedidoResponseDTO {
  id: number;
  instanciaItem: InstanciaItemWithItemResponseDTO;
  observacao: string | null;
  quantidade: number;
  respostas: RespostaCampoFormularioResponseDTO[];
}
