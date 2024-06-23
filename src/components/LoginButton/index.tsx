import { Container, Label } from "./styles";
import Google from "../../assets/google.svg?react";
import { HTMLAttributes } from "react";
import { useAuth } from "../../hooks/useAuth";

export interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: string;
}

export const LoginButton = ({
  children = "Continuar com o Google",
  ...rest
}: LoginButtonProps) => {
  const { usuario, login } = useAuth();

  if (usuario) {
    return null;
  }

  return (
    <Container {...rest} onClick={login}>
      <Google />
      <Label>{children}</Label>
    </Container>
  );
};
