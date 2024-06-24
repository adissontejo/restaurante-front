import { useState } from "react";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { CardFunc } from "./CardFunc";
import { funcionarioQuery } from "../../services/api/funcionario";
import { BoxHeader } from "./styles";
import { theme } from "../../styles/theme";
import { Add } from "@mui/icons-material";
// Você precisará criar este componente
import { DialogFuncionarioForm } from "./DialogFuncionarioForm";
import { useRestaurante } from "../../hooks/useRestaurante";

export const RestauranteFuncionarios = () => {
  const [showModal, setShowModal] = useState(false);

  const { restaurante } = useRestaurante();

  const { data: funcionarios } = funcionarioQuery.params(restaurante.id).use();

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
          <Add style={{ height: "16px", color: theme.colors.white[500] }} />
          <Typography variant="button">ADICIONAR FUNCIONÁRIO</Typography>
        </Button>
      </BoxHeader>
      <Stack spacing={8}>
        {funcionarios?.map((funcionario) => (
          <CardFunc funcionario={funcionario} key={funcionario.id} />
        ))}
      </Stack>
      <Dialog open={showModal}>
        <DialogFuncionarioForm handleClose={handleToogleModal} />
      </Dialog>
    </>
  );
};
