import { FuncionarioResponseDTO } from "./funcionario-response.dto";
import { ItemPedidoResponseDTO } from "./item-pedido-response.dto";

export interface PedidoResponseDTO {
  id: number;
  dataHora: string;
  numeroMesa: number;
  observacao: string | null;
  itens: ItemPedidoResponseDTO[];
  iniciado: boolean;
  funcionarioResponsavel: FuncionarioResponseDTO | null;
}
