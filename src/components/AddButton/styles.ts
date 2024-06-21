import styled from "styled-components";

export const Container = styled.button`
  align-self: stretch;
  padding: 24px 16px;

  background: ${({ theme }) => theme.colors.beige[100]};
  border: 1px solid ${({ theme }) => theme.colors.brown[200]};
  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.brown[400]};
  font-size: 18px;
  font-weight: 700;
`;
