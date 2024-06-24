import { useMemo, useState } from "react";
import { Dialog, Grid } from "@mui/material";
import { CardItem } from "./CardItem";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";
import { useRestaurante } from "../../hooks/useRestaurante";
import { categoriasQuery } from "../../services/api/categorias";
import { DialogItemForm } from "./DialogItemForm";

export interface RestauranteItensProps {
  admin?: boolean;
}

export const RestauranteItens = ({ admin }: RestauranteItensProps) => {
  const { restaurante } = useRestaurante();

  const [createOpen, setCreateOpen] = useState(false);

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
      (item) => item.habilitado || admin
    );
  }, [activeCategory, categorias, admin]);

  return (
    <>
      <TitleWithUnderline
        text="Menu"
        buttonText="Criar item"
        buttonAction={() => categorias?.length && setCreateOpen(true)}
      />
      <ListTab
        value={activeCategory}
        items={listTabItems}
        onChange={setActiveCategory}
      />
      <Grid container spacing={12}>
        {items?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
            <CardItem
              item={item}
              admin={admin}
              categoriaId={categorias?.[activeCategory]?.id || 0}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog open={createOpen}>
        <DialogItemForm
          handleClose={() => setCreateOpen(false)}
          categoriaId={categorias?.[activeCategory]?.id || 0}
        />
      </Dialog>
    </>
  );
};
