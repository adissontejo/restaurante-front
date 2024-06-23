import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 24px 32px;

  background: ${({ theme }) => theme.colors.beige[500]};
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.p`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black[400]};
  font-size: 16px;
  font-weight: 600;
`;

export const Value = styled.p`
  color: ${({ theme }) => theme.colors.black[600]};
  font-size: 40px;
  font-weight: 800;
`;
