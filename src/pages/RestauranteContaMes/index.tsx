import { useState } from "react";
import { OrderList } from "./OrdersList";
import { Grid } from "@mui/material";
import { ContaCard } from "./ContaCard";
import { PaymentCard } from "./PaymentCard";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";

export const RestauranteContaMes = () => {
  const itensTab = ["Conta", "Pedidos"];
  const [activeItem, setActiveItem] = useState(itensTab[0]);

  const handleClickItemMenu = (categoria: string) => {
    setActiveItem(categoria);
  };

  return (
    <>
      <TitleWithUnderline text="Conta do Mês" />
      <ListTab items={itensTab} handleClick={handleClickItemMenu} />
      {activeItem === "Conta" ? (
        <Grid container spacing={12}>
          <Grid item xs={12} sm={4} md={8}>
            <ContaCard />
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <PaymentCard />
          </Grid>
        </Grid>
      ) : (
        <OrderList />
      )}
    </>
  );
};
