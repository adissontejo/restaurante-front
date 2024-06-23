import styled from "styled-components";

export type StatusVariant = "backlog" | "inProgress" | "finished" | "canceled";

type ContainerProps = {
  variant: StatusVariant;
  clickable: boolean;
};

export const Container = styled.button<ContainerProps>`
  padding: 12px 24px;

  background: ${({ theme, variant }) => {
    switch (variant) {
      case "backlog":
        return theme.colors.brown[400];
      case "inProgress":
        return theme.colors.yellow[600];
      case "finished":
        return theme.colors.green[400];
      case "canceled":
        return theme.colors.red[400];
    }
  }};
  border-radius: 15px;

  cursor: ${({ clickable }) => (clickable ? "pointer" : "initial")};

  display: flex;
  align-items: center;
  gap: 8px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(${({ clickable }) => (clickable ? 0.9 : 1)});
  }

  svg {
    width: 20px;
    height: 20px;

    * {
      fill: white;
    }
  }
`;

export const Label = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;
