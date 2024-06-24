import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 32px;
`;

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

export const VerticalLine = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: 10px;
`;

export const EditButton = styled.button`
  padding: 12px 24px;

  background: ${({ theme }) => theme.colors.brown[400]};
  border-radius: 15px;

  display: flex;
  align-items: center;
  gap: 8px;

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

export const EditLabel = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;
