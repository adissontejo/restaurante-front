import { PedidosList } from "../../components/PedidosList";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";

export const RestaurantePedidos = () => {
  return (
    <>
      <TitleWithUnderline text="Pedidos" />
      <PedidosList />
    </>
  );
};
