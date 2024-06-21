import { Modal } from "../Modal";
import { Container } from "./styles";
import { LoginButton } from "../LoginButton";
import { useAuth } from "../../hooks/useAuth";

export const LoginModal = () => {
  const { usuario, login } = useAuth();

  return (
    <Modal open={!usuario}>
      <Container title="Fazer login">
        <LoginButton onClick={login} />
      </Container>
    </Modal>
  );
};
