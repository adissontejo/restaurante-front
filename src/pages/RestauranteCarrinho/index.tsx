import { ItemCartList } from "./ItemCartList";
import { Grid } from "@mui/material";
import { PaymentCard } from "./PaymentCard";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";

export const RestauranteCarrinho = () => {
  return (
    <>
      <TitleWithUnderline text="Carrinho" />
      <Grid container spacing={12}>
        <Grid item xs={12} sm={4} md={8}>
          <ItemCartList />
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <PaymentCard />
        </Grid>
      </Grid>
    </>
  );
};
