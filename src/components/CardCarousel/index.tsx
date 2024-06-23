import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { formatarEndereco } from "../../utils";
import { Line } from "./styles";
import { theme } from "../../styles/theme";
import { RestauranteResponseDTO } from "../../services/api/dtos/restaurante-response.dto";

interface CardCarouselProps {
  restaurante: RestauranteResponseDTO;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ restaurante }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ height: "120px", width: "120px", zIndex: 1 }}>
        <CardMedia
          component="img"
          image={restaurante.logoUrl ? restaurante.logoUrl : ""}
          alt={restaurante.nome}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "100px",
            border: "4px solid #fff",
          }}
        />
      </Box>
      <Card
        variant="elevation"
        sx={{
          width: 400,
          paddingTop: "70px",
          marginTop: "-70px",
          borderRadius: "24px",
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Typography gutterBottom variant="h6" style={{ fontWeight: 800 }}>
              {restaurante.nome}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              style={{ fontWeight: 700 }}
            >
              aberto
            </Typography>
          </Box>
          <Line />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Localização
            </Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: 600, color: theme.colors.black[500] }}
            >
              {formatarEndereco(
                restaurante.rua,
                restaurante.numero,
                restaurante.complemento,
                restaurante.cep,
                restaurante.bairro,
                restaurante.cidade,
                restaurante.estado
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
