import { useSearchParams } from "react-router-dom";
import {
  BoxTitle,
  Container,
  Description,
  Overlay,
  Strong,
  Title,
} from "./styles";
import { restauranteByDominioQuery } from "../../services/api/restaurantes";
import { CardLogin } from "../../components/CardLogin";
import { useEffect, useState } from "react";

interface LoginProps {

}

export const Login: React.FC<LoginProps> = () => {
    const [restaurante, setRestaurante] = useState<any | null>(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
      const fetchRestaurante = async () => {
        const dominio = searchParams.get("restaurante");
        try {
            const restaurante = await restauranteByDominioQuery.params(dominio ?? "").fetch();
            setRestaurante(restaurante);
        } catch (error) {
          console.error("Erro ao buscar restaurante:", error);
          setRestaurante(null);
        }
      };

      fetchRestaurante();
    }, [searchParams]);

    return (
        <Container>
            <Overlay>
                <BoxTitle>
                    <Title>
                        Bem vindo ao <Strong>RestoWeb</Strong>
                    </Title>
                    <Description style={{ textAlign: "left"}}>
                        Oferecemos uma ferramenta poderosa para administrar seu
                        estabelecimento com excelência e eficiência.
                    </Description>
                </BoxTitle>
                {restaurante && (
                    <CardLogin restaurante={restaurante} />
                )}
            </Overlay>
        </Container>
    );
};
