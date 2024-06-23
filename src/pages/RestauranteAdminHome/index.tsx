import { Outlet, useSearchParams } from "react-router-dom";
import { InfoCard } from "../../components/InfoCard";
import { ListTab } from "../../components/ListTab";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { useRestaurante } from "../../hooks/useRestaurante";
import { status } from "./constants";
import { InfoWrapper } from "./styles";
import { useMemo } from "react";
import { PedidosList } from "../../components/PedidosList";
import { useSocket } from "../../hooks/useSocket";
import { StatusItemPedido } from "../../services/api/dtos/item-pedido-response.dto";

export const RestauranteAdminHome = () => {
  const { restaurante } = useRestaurante();
  const { pedidos } = useSocket();

  const [searchParams, setSearchParams] = useSearchParams();

  const summary = useMemo(() => {
    return {
      ativos: pedidos.filter((item) => !item.iniciado).length,
      preparando: pedidos.filter(
        (pedido) =>
          pedido.iniciado &&
          pedido.itens.some(
            (item) => item.status === StatusItemPedido.PREPARANDO
          )
      ).length,
      finalizados: pedidos.filter((pedido) =>
        pedido.itens.every(
          (item) => item.status !== StatusItemPedido.PREPARANDO
        )
      ).length,
    };
  }, [status, pedidos]);

  const active = useMemo(() => {
    const status = searchParams.get("status");

    if (!status) {
      return "todos";
    }

    return status;
  }, [searchParams]);

  return (
    <>
      <TitleWithUnderline text={restaurante.nome} />
      <InfoWrapper>
        <InfoCard label="Pedidos Ativos" value={summary.ativos} />
        <InfoCard label="Em Preparação" value={summary.preparando} />
        <InfoCard label="Pedidos Finalizados" value={summary.finalizados} />
      </InfoWrapper>
      <ListTab
        items={status}
        value={active}
        onChange={(value) => setSearchParams({ status: value })}
      />
      <PedidosList admin status={active as any} />
      <Outlet />
    </>
  );
};
