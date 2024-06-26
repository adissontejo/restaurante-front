import styled from "styled-components";

export const BoxHeader = styled.div`
  background: ${({ theme }) => theme.colors.beige[500]};
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
`;
