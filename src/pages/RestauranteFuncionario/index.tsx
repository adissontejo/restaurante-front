import { useMemo, useState } from "react";
import { Button, Dialog, Grid, Typography } from "@mui/material";
import { CardFunc } from "./CardFunc"; // Certifique-se de que o CardFunc esteja corretamente importado
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";
import { useRestaurante } from "../../hooks/useRestaurante";
import { funcionarioQuery } from "../../services/api/funcionario";
import { BoxHeader } from "./styles";
import { theme } from "../../styles/theme";
import { Add } from "@mui/icons-material";
// Você precisará criar este componente
import { DialogCreateFuncionario } from "./CreateFunc";

export const RestauranteFuncionarios = () => {
  const [showModal, setShowModal] = useState(false);

  const { restaurante } = useRestaurante();

  const { data: funcionarios } = funcionarioQuery.params(restaurante.id).use();

  const listTabItems = useMemo(() => {
    return funcionarios?.map((funcionario, index) => ({
      label: funcionario.usuario.nome,
      value: index,
    }));
  }, [funcionarios]);

  const [activeFuncionario, setActiveFuncionario] = useState(0);

  const items = useMemo(() => {
    return funcionarios?.filter(
      (funcionario) => funcionario.cargo === 'garcom' // Por exemplo, filtrar por cargo específico
    );
  }, [funcionarios]);

  const handleToogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <BoxHeader>
        <TitleWithUnderline text="Funcionários" />
        <Button
          variant="contained"
          style={{ background: theme.colors.black[600], minWidth: "200px" }}
          onClick={handleToogleModal}
        >
          <Add style={{ height: '16px', color: theme.colors.white[500] }}/>
          <Typography variant="button">ADICIONAR FUNCIONÁRIO</Typography>
        </Button>
      </BoxHeader>
      <ListTab
        value={activeFuncionario}
        items={listTabItems}
        onChange={setActiveFuncionario}
      />
      <Grid container spacing={12}>
        {items?.map((funcionario, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
            <CardFunc funcionario={funcionario} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={showModal}>
        <DialogCreateFuncionario handleClose={handleToogleModal} />
      </Dialog>
    </>
  );
};
