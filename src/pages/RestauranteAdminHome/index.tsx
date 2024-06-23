import { Outlet, useSearchParams } from "react-router-dom";
import { InfoCard } from "../../components/InfoCard";
import { ListTab } from "../../components/ListTab";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { useRestaurante } from "../../hooks/useRestaurante";
import { status } from "./constants";
import { InfoWrapper } from "./styles";
import { useMemo } from "react";
import { PedidosList } from "../../components/PedidosList";

export const RestauranteAdminHome = () => {
  const { restaurante } = useRestaurante();

  const [searchParams, setSearchParams] = useSearchParams();

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
        <InfoCard label="Pedidos Ativos" value={15} />
        <InfoCard label="Em Preparação" value={15} />
        <InfoCard label="Pedidos Finalizados" value={15} />
      </InfoWrapper>
      <ListTab
        items={status}
        value={active}
        onChange={(value) => setSearchParams({ status: value })}
      />
      <PedidosList admin />
      <Outlet />
    </>
  );
};
