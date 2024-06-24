import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import { EditButton, EditLabel, VerticalLine } from "./styles";
import Pencil from "../../../assets/pencil.svg?react";
import { theme } from "../../../styles/theme";
import { FuncionarioResponseDTO } from "../../../services/api/dtos/funcionario-response.dto";
import { cargos } from "../../../constants";
import { DialogFuncionarioForm } from "../DialogFuncionarioForm";
import { Cargo } from "../../../services/api/dtos/create-funcionario.dto";

interface CardFuncProps {
  funcionario: FuncionarioResponseDTO;
}

export const CardFunc: React.FC<CardFuncProps> = ({ funcionario }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Card sx={{ borderRadius: "24px", padding: "8px 24px", boxShadow: 3 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Avatar src={funcionario.usuario.fotoPerfilUrl || undefined} />
            <Typography
              variant="h6"
              style={{ color: theme.colors.black[500], fontWeight: 800 }}
            >
              {funcionario.usuario.nome}
            </Typography>

            <VerticalLine />
            <Typography
              variant="body1"
              style={{
                color: theme.colors.black[300],
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {cargos.find((item) => item.value === funcionario.cargo)?.label}
            </Typography>
            <EditButton
              onClick={
                funcionario.cargo === Cargo.DONO
                  ? undefined
                  : () => setShowModal(true)
              }
              style={{
                opacity: funcionario.cargo === Cargo.DONO ? 0 : 1,
                cursor:
                  funcionario.cargo === Cargo.DONO ? "initial" : "pointer",
              }}
            >
              <Pencil />
              <EditLabel>Editar</EditLabel>
            </EditButton>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={showModal}>
        <DialogFuncionarioForm
          funcionario={funcionario}
          handleClose={() => setShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
