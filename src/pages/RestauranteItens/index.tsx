import { useEffect, useMemo, useState } from "react";
import { Dialog, Grid } from "@mui/material";
import { CardItem } from "./CardItem";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";
import { useRestaurante } from "../../hooks/useRestaurante";
import { DialogItemForm } from "./DialogItemForm";
import { getItensQuery } from "../../services/api/itens";
import { getCategorias } from "../../utils";
import { useSearchParams } from "react-router-dom";

export interface RestauranteItensProps {
  admin?: boolean;
}

export const RestauranteItens = ({ admin }: RestauranteItensProps) => {
  const { restaurante } = useRestaurante();

  const [createOpen, setCreateOpen] = useState(false);

  const { data: itens } = getItensQuery.params(restaurante.id).use();

  const [searchParams, setSearchParams] = useSearchParams();

  const categoria = searchParams.get("categoria");

  const categorias = useMemo(() => {
    return getCategorias(itens || []);
  }, [itens]);

  useEffect(() => {
    if (!categorias.includes(categoria || "")) {
      setSearchParams({ categoria: categorias[0] });
    }
  }, [categorias]);

  const listTabItems = useMemo(() => {
    return categorias.map((categoria) => ({
      label: categoria,
      value: categoria,
    }));
  }, [categorias]);

  const filteredItens = useMemo(() => {
    return itens?.filter(
      (item) => item.categoria === categoria && (item.habilitado || admin)
    );
  }, [itens, categoria, admin]);

  return (
    <>
      <TitleWithUnderline
        text="Menu"
        buttonText="Criar item"
        buttonAction={() => setCreateOpen(true)}
      />
      <ListTab
        value={searchParams.get("categoria")}
        items={listTabItems}
        onChange={(value) => setSearchParams({ categoria: value })}
      />
      <Grid container spacing={12}>
        {filteredItens?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
            <CardItem item={item} admin={admin} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={createOpen}>
        <DialogItemForm handleClose={() => setCreateOpen(false)} />
      </Dialog>
    </>
  );
};
