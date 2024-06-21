import styled from "styled-components";

export const InputCard = styled.div`
  align-self: stretch;
  padding: 24px 16px;

  background: ${({ theme }) => theme.colors.beige[100]};
  border: 1px solid ${({ theme }) => theme.colors.brown[200]};
  border-radius: 24px;
`;
