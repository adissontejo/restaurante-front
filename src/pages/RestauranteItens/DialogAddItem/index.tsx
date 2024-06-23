import React from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { BoxImage, BoxTitle, ButtonsWrapper } from "./styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { theme } from "../../../styles/theme";
import { CategoriaResponseDTO } from "../../../services/api/dtos/categoria-response.dto";
import { useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { toast } from "react-toastify";

interface DialogAddItemProps {
  item: CategoriaResponseDTO["itens"][number];
  handleClose: () => void;
}

interface FormData {
  quantidade: number;
  observacao: string;
}

export const DialogAddItem: React.FC<DialogAddItemProps> = ({
  item,
  handleClose,
}) => {
  const { addCartItem } = useRestaurante();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      quantidade: 1,
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // falta implementar acompanahmentos

  const handleAdd = (data: FormData) => {
    addCartItem({
      ...item,
      observacao: data.observacao,
      quantidade: data.quantidade,
    });
    toast.success("Item adicionado ao carrinho!");
    handleClose();
  };

  return (
    <>
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          style={{ color: theme.colors.black[600], fontWeight: 600 }}
        >
          {" "}
          Adicionar Item{" "}
        </Typography>
        <CrossSmall onClick={handleClose} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <BoxImage>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={item.fotoUrl || ""}
              alt={item.nome}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
          </Box>
          <BoxTitle
            style={{ background: theme.colors.brown[400], padding: "8px 24px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {" "}
              {item.nome}
            </Typography>
            <Typography variant="body1">
              {" "}
              + R$ {item.instanciaAtiva.preco}
            </Typography>
          </BoxTitle>
        </BoxImage>
        <ControlledFormField
          control={control}
          name="quantidade"
          label="Quantidade"
          type="number"
          required
          fullWidth
          sx={{ marginY: 1 }}
        />
        <ControlledFormField
          control={control}
          name="observacao"
          label="Alguma Observação?"
          fullWidth
          sx={{ marginY: 1 }}
        />
        <BoxTitle>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.colors.black[500] }}
          >
            Escolha os Acompanhamentos
          </Typography>
          <Typography variant="body2" sx={{ color: theme.colors.black[300] }}>
            Máximo: 4
          </Typography>
        </BoxTitle>
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
            onClick={handleSubmit(handleAdd)}
          >
            <Typography variant="button">Adicionar</Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </>
  );
};
