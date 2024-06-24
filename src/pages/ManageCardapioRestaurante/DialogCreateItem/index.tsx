import React from "react";
import {
    Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ButtonsWrapper } from "./styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { theme } from "../../../styles/theme";
import { useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { ControlledUploadImage } from "../../../components/UploadImage";

interface DialogCreateItemProps {
  handleClose: () => void;
}

interface FormData {
    nome: string;
    valor: number;
    fotoItem: File;
}

export const DialogCreateItem: React.FC<DialogCreateItemProps> = ({
  handleClose,
}) => {
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {

        },
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
          {" "}
          Criar Item{" "}
        </Typography>
        <CrossSmall onClick={handleClose} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <Box
          position="relative"
          sx={{
            borderRadius: "50%",
          }}
        >
          <ControlledUploadImage
            control={control}
            name="fotoItem"
          />
        </Box>
        <ControlledFormField
          control={control}
          name="nome"
          label="Nome do Item"
          required
          fullWidth
          sx={{ marginY: 1 }}
        />
        <ControlledFormField
            prefix={"R$ "}
            name="valor"
            control={control}
            label="Valor do Item"
            fullWidth
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
          >
            <Typography variant="button">Criar</Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </>
  );
};
