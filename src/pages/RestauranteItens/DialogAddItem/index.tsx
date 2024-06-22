import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { BoxImage, BoxTitle, ButtonsWrapper } from "./styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { InstanciaItem } from "../../../data";
import { theme } from "../../../styles/theme";

interface DialogAddItemProps {
  instanciaItem: InstanciaItem;
  open: boolean;
  handleClose: () => void;
}

export const DialogAddItem: React.FC<DialogAddItemProps> = ({
  instanciaItem,
  open,
  handleClose,
}) => {
  const [quantity, setQuantity] = useState<number | string>("");
  const [observation, setObservation] = useState<string>("");

  // falta implementar acompanahmentos

  const handleAdd = () => {
    // Handle add item logic here
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
              src={instanciaItem.item.urlImagem}
              alt={instanciaItem.item.nome}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
          </Box>
          <BoxTitle
            style={{ background: theme.colors.brown[400], padding: "8px 24px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {" "}
              {instanciaItem.item.nome}
            </Typography>
            <Typography variant="body1"> + R$ {instanciaItem.preco}</Typography>
          </BoxTitle>
        </BoxImage>
        <TextField
          label="Quantidade"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          sx={{ marginY: 1 }}
        />
        <TextField
          label="Alguma Observação?"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
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
            onClick={handleAdd}
          >
            <Typography variant="button">Adicionar</Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </Dialog>
  );
};
