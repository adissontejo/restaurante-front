import styled from "styled-components";

export const CardHours = styled.div`
  padding: 32px 40px;
  background-color: ${({ theme }) => theme.colors.beige[200]};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
