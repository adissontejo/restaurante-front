import { Grid } from "@mui/material";
import { ContaCard } from "./ContaCard";
import { PaymentCard } from "./PaymentCard";

export const RestauranteContaMes = () => {
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} sm={4} md={8}>
        <ContaCard />
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
        <PaymentCard />
      </Grid>
    </Grid>
  );
};
