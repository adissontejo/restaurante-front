import { HTMLAttributes } from "react";
import { Container, Label } from "./styles";
import Plus from "../../assets/plus.svg?react";

export interface AddButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: string;
}

export const AddButton = ({ children, ...rest }: AddButtonProps) => {
  return (
    <Container {...rest}>
      <Plus />
      <Label>{children}</Label>
    </Container>
  );
};
