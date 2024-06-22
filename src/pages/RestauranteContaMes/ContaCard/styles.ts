import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.beige[500]};
  border-radius: 24px;
  padding: 32px;
  gap: 24px;
`;

export const BoxPayment = styled.div`
  display: flex;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.green[100]};
  border-radius: 15px;
  justify-content: space-between;
  align-items: center;
`;
