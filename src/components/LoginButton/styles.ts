import styled from "styled-components";

export const Container = styled.button`
  padding: 16px;

  align-self: stretch;

  background: ${({ theme }) => theme.colors.black[50]};
  border-radius: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.black[400]};
  font-size: 20px;
  font-weight: 600;
`;
