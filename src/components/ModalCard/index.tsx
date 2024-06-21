import { IconButton } from "@mui/material";
import { Container, Header, Title } from "./styles";
import { Close } from "@mui/icons-material";
import { HTMLAttributes } from "react";

export interface ModalCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  onClose?: () => void;
}

export const ModalCard = ({
  title,
  children,
  onClose,
  ...rest
}: ModalCardProps) => {
  return (
    <Container {...rest}>
      <Header>
        <Title>{title}</Title>
        {onClose && (
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        )}
      </Header>
      {children}
    </Container>
  );
};
