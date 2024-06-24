import React, { useRef } from "react";
import { Box, Button, Grid } from "@mui/material";
import { CardCarousel } from "../CardCarousel";
import { theme } from "../../styles/theme";
import { restaurantesQuery } from "../../services/api/restaurantes";
import { RestauranteResponseDTO } from "../../services/api/dtos/restaurante-response.dto";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRestaurante } from "../../hooks/useRestaurante";

interface CarouselListProps {}

export const CarouselList: React.FC<CarouselListProps> = () => {
    const { usuario } = useAuth();

  const { data: restaurantes } = restaurantesQuery.use();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const handleRestaurantClick = (restauranteData : RestauranteResponseDTO) => {

    navigate(`/login?restaurante=${restauranteData.dominio}`);
  };

  return (
    <Box sx={{ position: "relative", width: "100%"  }}>
      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          width: "100%",
          padding: "0 8%",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        ref={containerRef}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center"
          }}
        >
          {restaurantes?.map((restauranteData) => (
            <Grid
              item
              key={restauranteData.id}
              sx={{ display: "inline-block", minWidth: 300, flex: "0 0 auto" }}
              mr={24}
            >
            <Button
                variant="outlined"
                onClick={() => handleRestaurantClick(restauranteData)}
                sx={{ width: "100%", textAlign: "left", padding: 0, border: 'none', "&:hover": {  border: 'none' } }}
            >
                <CardCarousel restaurante={restauranteData} />
              </Button>
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
