import { OrderListItem } from "../OrderListItem";
import { BoxList } from "./styles";
import { useAuth } from "../../../hooks/useAuth";
import { Pedido, pedidos } from "../../../data";

export const OrderList = () => {
  const { usuario } = useAuth();

  const ordersList: Pedido[] = pedidos.filter(
    (pedido) => pedido.usuarioId === usuario?.id
  );

  return (
    <BoxList>
      {ordersList.map((order, index) => (
        <OrderListItem pedido={order} key={index} />
      ))}
    </BoxList>
  );
};
