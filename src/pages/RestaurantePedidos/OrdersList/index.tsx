import { OrderListItem } from "../OrderListItem";
import { BoxList } from "./styles";
import { useSocket } from "../../../hooks/useSocket";

export const OrderList = () => {
  const { pedidos } = useSocket();

  return (
    <BoxList>
      {pedidos.map((order, index) => (
        <OrderListItem pedido={order} key={index} />
      ))}
    </BoxList>
  );
};
