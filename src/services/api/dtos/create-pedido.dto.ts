import { CreateItemPedidoDTO } from "./create-item-pedido.dto";

export interface CreatePedidoDTO {
  restauranteId: number;
  usuarioId?: number;
  funcionarioId?: number;
  numeroMesa: number;
  observacao?: string;
  itens: Omit<CreateItemPedidoDTO, "pedidoId">[];
  cupomId?: number;
}
