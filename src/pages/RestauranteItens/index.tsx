import { useMemo, useState } from "react";
import { Grid } from "@mui/material";
import { CardItem } from "./CardItem";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";
import { useRestaurante } from "../../hooks/useRestaurante";
import { categoriasQuery } from "../../services/api/categorias";

export const RestauranteItens = () => {
  const { restaurante } = useRestaurante();

  const { data: categorias } = categoriasQuery.params(restaurante.id).use();

  const listTabItems = useMemo(() => {
    return categorias?.map((item, index) => ({
      label: item.nome,
      value: index,
    }));
  }, [categorias]);

  const [activeCategory, setActiveCategory] = useState(0);

  const items = useMemo(() => {
    return categorias?.[activeCategory]?.itens.filter(
      (item) => item.habilitado
    );
  }, [activeCategory, categorias]);

  return (
    <>
      <TitleWithUnderline text="Menu" />
      <ListTab
        value={activeCategory}
        items={listTabItems}
        onChange={setActiveCategory}
      />
      <Grid container spacing={12}>
        {items?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
            <CardItem item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
