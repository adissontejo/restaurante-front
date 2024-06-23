import { useSocket } from "../../hooks/useSocket";
import { PedidoCard } from "../PedidoCard";
import { BoxList } from "./styles";

export interface PedidosListProps {
  admin?: boolean;
}

export const PedidosList = ({ admin }: PedidosListProps) => {
  const { pedidos } = useSocket();

  return (
    <BoxList>
      {pedidos.map((order, index) => (
        <PedidoCard admin={admin} pedido={order} key={index} />
      ))}
    </BoxList>
  );
};
