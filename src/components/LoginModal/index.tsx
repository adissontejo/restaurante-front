import { Modal } from "../Modal";
import { Container } from "./styles";
import { LoginButton } from "../LoginButton";
import { useAuth } from "../../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";

export const LoginModal = () => {
  const { usuario, login } = useAuth();

  return (
    <Modal open={!usuario}>
      <Container title="Fazer login" onClick={login}>
        <LoginButton />
        <GoogleLogin onSuccess={console.log} />
      </Container>
    </Modal>
  );
};
