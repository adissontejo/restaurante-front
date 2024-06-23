import { Container, Body } from "./styles";
import { LateralMenu } from "../LateralMenu";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { LoginModal } from "../LoginModal";
import { useRestaurante } from "../../hooks/useRestaurante";
import { useAuth } from "../../hooks/useAuth";
import { SocketProvider } from "../../contexts/Socket";

export interface AppContainerProps {
  admin?: boolean;
}

export const AppContainer = ({ admin }: AppContainerProps) => {
  const { dominio } = useParams();

  const { usuario } = useAuth();
  const { funcionarioLogado } = useRestaurante();

  if (admin && usuario && !funcionarioLogado) {
    return <Navigate to={`/restaurante/${dominio}`} />;
  }

  return (
    <SocketProvider admin={admin}>
      <Container>
        {admin && <LoginModal />}
        <LateralMenu />
        <Body>
          <Outlet />
        </Body>
      </Container>
    </SocketProvider>
  );
};
