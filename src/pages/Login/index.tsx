import {
  BoxTitle,
  Container,
  Description,
  Overlay,
  Strong,
  Title,
} from "./styles";
import { CardLogin } from "../../components/CardLogin";
import { useRestaurante } from "../../hooks/useRestaurante";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const { restaurante } = useRestaurante();

  return (
    <Container>
      <Overlay>
        <BoxTitle>
          <Title>
            Bem vindo ao <Strong>RestoWeb</Strong>
          </Title>
          <Description style={{ textAlign: "left" }}>
            Oferecemos uma ferramenta poderosa para administrar seu
            estabelecimento com excelência e eficiência.
          </Description>
        </BoxTitle>
        <CardLogin restaurante={restaurante} />
      </Overlay>
    </Container>
  );
};
