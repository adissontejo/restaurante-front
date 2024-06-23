import React, { useRef } from "react";
import { Box, Button, Grid } from "@mui/material";
import { CardCarousel } from "../CardCarousel";
import { theme } from "../../styles/theme";
import { restaurantesQuery } from "../../services/api/restaurantes";

interface CarouselListProps {}

export const CarouselList: React.FC<CarouselListProps> = () => {
  const { data: restaurantes } = restaurantesQuery.use();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300; // Ajuste a distância do scroll conforme necessário
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300; // Ajuste a distância do scroll conforme necessário
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          width: "100%",
          padding: "0 16px",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, and Opera
          },
        }}
        ref={containerRef}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {restaurantes?.map((restaurante) => (
            <Grid
              item
              key={restaurante.id}
              sx={{ display: "inline-block", minWidth: 300, flex: "0 0 auto" }}
              mr={24}
            >
              <CardCarousel restaurante={restaurante} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button
        variant="contained"
        onClick={handleScrollLeft}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: theme.colors.brown[300],
        }}
      >
        &lt;
      </Button>
      <Button
        variant="contained"
        onClick={handleScrollRight}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: theme.colors.brown[300],
        }}
      >
        &gt;
      </Button>
    </Box>
  );
};

export default CarouselList;
