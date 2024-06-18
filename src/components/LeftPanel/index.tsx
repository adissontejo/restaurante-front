import { ReactNode } from "react";
import { Container, Overlay, Wrapper } from "./styles";

export interface LeftPanelProps {
  children?: ReactNode;
}

export const LeftPanel = ({ children }: LeftPanelProps) => {
  return (
    <Container>
      <Overlay>
        <Wrapper>{children}</Wrapper>
      </Overlay>
    </Container>
  );
};
