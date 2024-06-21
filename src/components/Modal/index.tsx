import { Modal as MuiModal, ModalProps as MuiModalProps } from "@mui/material";
import { Container } from "./styles";

export interface ModalProps extends MuiModalProps {}

export const Modal = ({ children, ...rest }: MuiModalProps) => {
  return (
    <MuiModal {...rest}>
      <Container>{children}</Container>
    </MuiModal>
  );
};
