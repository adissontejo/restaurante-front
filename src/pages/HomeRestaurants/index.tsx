import { useNavigate } from "react-router-dom";
import {
  BoxTitle,
  Container,
  Description,
  Overlay,
  Strong,
  Title,
} from "./styles";
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
