import styled from "styled-components";
import { InputCard } from "../../../../InputCard";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Times = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TimeCard = styled(InputCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const ConnectorText = styled.p`
  color: ${({ theme }) => theme.colors.black[400]};
  font-size: 16px;
  font-weight: 600;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  gap: 24px;
`;
