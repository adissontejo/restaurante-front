import { useMemo, useState } from "react";
import { Button, Dialog, Grid, Typography } from "@mui/material";
import { CardItem } from "./CardItem";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";
import { useRestaurante } from "../../hooks/useRestaurante";
import { categoriasQuery } from "../../services/api/categorias";
import { BoxHeader } from "./styles";
import { theme } from "../../styles/theme";
import { Add } from "@mui/icons-material";
import { DialogCreateItem } from "./DialogCreateItem";

export const ManageCardapioRestaurante = () => {
const [showModal, setShowModal] = useState(false);

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


  const handleToogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <BoxHeader>
        <TitleWithUnderline text="Menu" />
        <Button
          variant="contained"
          style={{ background: theme.colors.black[600], minWidth: "200px" }}
          onClick={handleToogleModal}
        >
            <Add style={{ height: '16px', color: theme.colors.white[500] }}/>
            <Typography variant="button">CRIAR ITEM</Typography>
        </Button>
      </BoxHeader>
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
      <Dialog open={showModal}>
        <DialogCreateItem handleClose={handleToogleModal} />
      </Dialog>
    </>
  );
};
