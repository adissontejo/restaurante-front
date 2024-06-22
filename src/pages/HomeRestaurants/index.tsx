import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import { BoxTitle, Container, Description, Overlay, Strong, Title } from "./styles";
import { restaurantes } from "../../data";
import { CardCarousel } from "../../components/CardCarousel";
import { Box } from "@mui/material";
import { CarouselList } from "../../components/CarouselList";

export const HomeRestaurants = () => {
  const navigate = useNavigate();

  return (
    <Container>
        <Overlay>
            <BoxTitle>
                <Title>
                    Bem vindo ao <Strong>RestoWeb</Strong>
                </Title>
                <Description>
                    Oferecemos uma ferramenta poderosa para administrar seu
                    estabelecimento com excelência e eficiência.
                </Description>
            </BoxTitle>
            <CarouselList />
        </Overlay>
    </Container>
  );
};
