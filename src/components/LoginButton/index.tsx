import { Container, Label } from "./styles";
import Google from "../../assets/google.svg?react";
import { HTMLAttributes } from "react";

export interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const LoginButton = ({ ...rest }: LoginButtonProps) => {
  return (
    <Container {...rest}>
      <Google />
      <Label>Continuar com o Google</Label>
    </Container>
  );
};
