import React, { useState } from "react";
import { Grid } from "@mui/material";
import { CardItem } from "./CardItem";
import { instanciasItens } from "../../data";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";
import { useRestaurante } from "../../hooks/useRestaurante";

export const RestauranteItens = () => {
  const { restaurante } = useRestaurante();

  const items = instanciasItens.filter(
    (instancia) =>
      instancia.item.restauranteId == restaurante.id &&
      instancia.item.habilitado &&
      instancia.ativo
  );
  const categoriasSet = Array.from(
    new Set(
      instanciasItens
        .filter(
          (instancia) =>
            instancia.item.restauranteId == restaurante.id &&
            instancia.item.habilitado &&
            instancia.ativo
        )
        .map((item) => item.item.categoria)
    )
  );

  const [activeCategory, setActiveCategory] = useState(categoriasSet[0]);

  const handleClickItemMenu = (categoria: string) => {
    setActiveCategory(categoria);
  };

  return (
    <>
      <TitleWithUnderline text="Menu" />
      <ListTab items={categoriasSet} handleClick={handleClickItemMenu} />
      <Grid container spacing={12}>
        {items.map((instancia, index) =>
          instancia.item.categoria === activeCategory ? (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
              <CardItem instanciaItem={instancia} />
            </Grid>
          ) : null
        )}
      </Grid>
    </>
  );
};
