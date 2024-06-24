import styled from "styled-components";

export const CardItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* Mantém a proporção 1:1 (altura igual à largura) */
  overflow: hidden;

  &:hover .icon {
    opacity: 1;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const IconDiv = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 50%;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ButtonLabel = styled.p`
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
`;

export const Button = styled.button<{ variant: "error" | "regular" }>`
  padding: 12px 24px;

  width: 100%;
  background: ${({ theme, variant }) =>
    variant === "error" ? theme.colors.red[100] : theme.colors.white[500]};
  border-radius: 50px;

  display: flex;
  align-items: center;
  gap: 10px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  ${ButtonLabel} {
    color: ${({ theme, variant }) =>
      variant === "error" ? theme.colors.red[400] : theme.colors.black[600]};
  }

  svg {
    width: 20px;
    height: 20px;

    * {
      fill: ${({ theme, variant }) =>
        variant === "error" ? theme.colors.red[400] : theme.colors.black[600]};
    }
  }
`;
