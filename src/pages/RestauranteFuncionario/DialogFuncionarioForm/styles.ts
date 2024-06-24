import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: flex-end;
  padding-top: 12px;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.black[100]};
`;

export const BoxImage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 24px;
  overflow: hidden;
`;

export const BoxTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EraseButton = styled.button`
  padding: 12px 24px;

  background: ${({ theme }) => theme.colors.red[400]};
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

export const EraseLabel = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;
