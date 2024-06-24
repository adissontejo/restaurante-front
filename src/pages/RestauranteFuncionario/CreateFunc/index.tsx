import React from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ButtonsWrapper } from "../../Home/styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { theme } from "../../../styles/theme";
import { useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { Cargo } from "../../../services/api/dtos/create-funcionario.dto";

interface DialogCreateFuncionarioProps {
  handleClose: () => void;
}

interface FormData {
  cargo: Cargo;
  usuarioId: number;
  restauranteId: number;
}

export const DialogCreateFuncionario: React.FC<DialogCreateFuncionarioProps> = ({
  handleClose,
}) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      cargo: undefined,
      usuarioId: 0,
      restauranteId: 0,
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data: FormData) => {
    // Lógica para salvar o novo funcionário
    console.log("Novo Funcionário:", data);
    handleClose();
  };

  return (
    <>
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          style={{ color: theme.colors.black[600], fontWeight: 600 }}
        >
          Criar Funcionário
        </Typography>
        <CrossSmall onClick={handleClose} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <ControlledFormField
          control={control}
          name="cargo"
          label="Cargo"
          select
          required
          fullWidth
          sx={{ marginY: 1 }}
          /*options={Object.values(Cargo).map((option) => ({
            label: option,
            value: option,
          }))*/
        />
        <ControlledFormField
          control={control}
          name="usuarioId"
          label="ID do Usuário"
          required
          fullWidth
          sx={{ marginY: 1 }}
          type="number"
        />
        <ControlledFormField
          control={control}
          name="restauranteId"
          label="ID do Restaurante"
          required
          fullWidth
          sx={{ marginY: 1 }}
          type="number"
        />

        <ButtonsWrapper>
          <Button
            variant="contained"
            style={{ background: theme.colors.white[500], minWidth: "200px" }}
            onClick={handleClose}
          >
            <Typography
              variant="button"
              style={{ color: theme.colors.black[600] }}
            >
              Cancelar
            </Typography>
          </Button>
          <Button
            variant="contained"
            style={{ background: theme.colors.black[600], minWidth: "200px" }}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="button">Criar</Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </>
  );
};
