import { Container, Label } from "./styles";

export interface ButtonProps {
  onClick?: () => void;
  children?: string;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Label>{children}</Label>
    </Container>
  );
};
