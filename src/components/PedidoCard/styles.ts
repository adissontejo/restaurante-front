import styled from "styled-components";

export const VerticalLine = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: 10px;
`;

export const ItemDetail = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 24px;
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black[100]};
  margin: 4px 32px;
`;

export const ItemButtons = styled.div`
  display: flex;
  gap: 24px;
`;

export const ItemButton = styled.button<{ variant: "cancel" | "confirm" }>`
  padding: 12px 24px;

  background: ${({ theme, variant }) =>
    variant === "cancel" ? theme.colors.red[400] : theme.colors.green[400]};
  border-radius: 15px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  svg {
    width: 20px;
    height: 20px;

    * {
      fill: white;
    }
  }
`;
