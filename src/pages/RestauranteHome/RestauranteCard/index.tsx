import React from "react";
import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";
import Marker from "../../../assets/marker.svg?react";
import { theme } from "../../../styles/theme";

interface RestauranteCardProps {
  imagemUrl: string;
  descricao: string;
  localizacao: string;
}

export const RestauranteCard: React.FC<RestauranteCardProps> = ({
  imagemUrl,
  descricao,
  localizacao,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "24px",
        gap: "40px",
        alignItems: "center",
        boxShadow: 3,
      }}
      variant="elevation"
    >
      <Box
        sx={{
          minWidth: "350px",
          height: "100%",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          alt="Imagem do restaurante"
          image={imagemUrl}
          title="Imagem de Exemplo"
          sx={{ width: "350px", height: "350px", objectFit: "cover" }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          minHeight: "100%",
        }}
      >
        <Typography variant="h6" sx={{ color: theme.colors.black[500] }}>
          {descricao}
        </Typography>
        <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Marker color={theme.colors.black[400]} style={{ height: "16px" }} />
          <Typography variant="body1" color={theme.colors.black[400]}>
            {localizacao}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
