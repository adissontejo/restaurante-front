import React, { useState } from "react";
import { Card, CardContent, CardMedia, Dialog, Typography } from "@mui/material";
import { CardItemDiv, CardWrapper, IconContainer, IconDiv } from "./styles";
import Plus from "../../../assets/plus.svg?react";
import { theme } from "../../../styles/theme";
import { FuncionarioResponseDTO } from "../../../services/api/dtos/funcionario-response.dto";

interface CardFuncProps {
  funcionario: FuncionarioResponseDTO;
}

export const CardFunc: React.FC<CardFuncProps> = ({ funcionario }) => {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <CardItemDiv>
        <CardWrapper
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card
            variant="elevation"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "24px",
            }}
          >
            <CardMedia
              component="div"
              style={{ height: "100%", width: "100%", backgroundColor: theme.colors.brown[50], display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Typography variant="h4" color={theme.colors.black[400]}>
                {funcionario.cargo}
              </Typography>
            </CardMedia>
            <IconContainer
              style={{ opacity: hovered ? 1 : 0 }}
              onClick={handleToogleModal}
            >
              <IconDiv>
                <Plus height={25} width={25} />
              </IconDiv>
            </IconContainer>
          </Card>
        </CardWrapper>
        <CardContent style={{ padding: 0 }}>
          <Typography
            variant="h5"
            component="div"
            color={theme.colors.black[600]}
            fontWeight={800}
          >
            {funcionario.usuario.nome}
          </Typography>
          <Typography variant="body1" color={theme.colors.black[400]}>
            Restaurante ID: {funcionario.restauranteId}
          </Typography>
        </CardContent>
      </CardItemDiv>
      <Dialog open={showModal} onClose={handleToogleModal}>
        <Typography variant="h6" component="div" style={{ padding: '16px' }}>
          Detalhes do Funcionário
        </Typography>
        <Typography variant="body1" component="div" style={{ padding: '16px' }}>
          Cargo: {funcionario.cargo}
        </Typography>
        <Typography variant="body1" component="div" style={{ padding: '16px' }}>
          Usuário: {funcionario.usuario.nome}
        </Typography>
        <Typography variant="body1" component="div" style={{ padding: '16px' }}>
          Restaurante ID: {funcionario.restauranteId}
        </Typography>
      </Dialog>
    </>
  );
};
