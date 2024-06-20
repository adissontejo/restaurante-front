import { HTMLAttributes } from "react";
import { Container, Label } from "./styles";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: string;
  variant?: "light" | "dark";
}

export const Button = ({
  children,
  variant = "light",
  ...rest
}: ButtonProps) => {
  return (
    <Container {...rest} variant={variant}>
      <Label>{children}</Label>
    </Container>
  );
};
