import { useMemo } from "react";
import { useSocket } from "../../hooks/useSocket";
import { PedidoCard } from "../PedidoCard";
import { BoxList } from "./styles";
import { StatusItemPedido } from "../../services/api/dtos/item-pedido-response.dto";

export interface PedidosListProps {
  admin?: boolean;
  status?: "ativos" | "preparando" | "finalizados" | "todos";
}

export const PedidosList = ({ admin, status = "todos" }: PedidosListProps) => {
  const { pedidos } = useSocket();

  const pedidosFiltered = useMemo(() => {
    if (status === "ativos") {
      return pedidos.filter((item) => !item.iniciado);
    } else if (status === "preparando") {
      return pedidos.filter(
        (pedido) =>
          pedido.iniciado &&
          pedido.itens.some(
            (item) => item.status === StatusItemPedido.PREPARANDO
          )
      );
    } else if (status === "finalizados") {
      return pedidos.filter((pedido) =>
        pedido.itens.every(
          (item) => item.status !== StatusItemPedido.PREPARANDO
        )
      );
    } else {
      return pedidos;
    }
  }, [status, pedidos]);

  return (
    <BoxList>
      {pedidosFiltered.map((order) => (
        <PedidoCard admin={admin} pedido={order} key={order.id} />
      ))}
    </BoxList>
  );
};
