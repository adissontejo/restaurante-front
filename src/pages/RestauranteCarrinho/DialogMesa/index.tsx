import React from "react";
import { Button, DialogContent, DialogTitle, Typography } from "@mui/material";
import { ButtonsWrapper } from "./styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { theme } from "../../../styles/theme";
import { useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";

interface DialogMesaProps {
  handleClose: () => void;
  onSubmit: (numeroMesa: number) => void;
}

interface FormData {
  numeroMesa: number;
}

export const DialogMesa: React.FC<DialogMesaProps> = ({
  onSubmit,
  handleClose,
}) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  return (
    <>
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          style={{ color: theme.colors.black[600], fontWeight: 600 }}
        >
          Número da mesa
        </Typography>
        <CrossSmall onClick={handleClose} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <ControlledFormField
          control={control}
          name="numeroMesa"
          label="Informe o número da sua mesa"
          type="number"
          required
          fullWidth
          sx={{ marginY: 1 }}
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
            onClick={handleSubmit((data) => onSubmit(data.numeroMesa))}
          >
            <Typography variant="button">Adicionar</Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </>
  );
};
