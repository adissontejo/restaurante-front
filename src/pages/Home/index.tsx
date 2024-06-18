import { useNavigate } from "react-router-dom";
import {
  ButtonsWrapper,
  Container,
  Description,
  Overlay,
  Strong,
  Title,
} from "./styles";
import { Button } from "../../components/Button";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Overlay>
        <Title>
          Bem vindo ao <Strong>RestoWeb</Strong>
        </Title>
        <Description>
          Oferecemos uma ferramenta poderosa para administrar seu
          estabelecimento com excelência e eficiência.
        </Description>
        <ButtonsWrapper>
          <Button onClick={() => navigate("/criar-restaurante")}>
            Crie seu restaurante!
          </Button>
          <Button>Ver restaurantes</Button>
        </ButtonsWrapper>
      </Overlay>
    </Container>
  );
};
