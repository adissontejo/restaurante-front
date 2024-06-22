import { ItemCartList } from "./ItemCartList";
import { Grid } from "@mui/material";
import { PaymentCard } from "./PaymentCard";
import { useMemo } from "react";
import { calculaTotalPedido } from "../../utils";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { useRestaurante } from "../../hooks/useRestaurante";

export const RestauranteCarrinho = () => {
  const { itensCarrinho } = useRestaurante();

  const totalPedido = useMemo(() => {
    return calculaTotalPedido(itensCarrinho);
  }, [itensCarrinho]);

  return (
    <>
      <TitleWithUnderline text="Carrinho" />
      <Grid container spacing={12}>
        <Grid item xs={12} sm={4} md={8}>
          <ItemCartList />
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <PaymentCard totalPedido={totalPedido} />
        </Grid>
      </Grid>
    </>
  );
};
