import styled from "styled-components";

export const Container = styled.div`
  align-self: stretch;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: 20px;
  font-weight: 700;
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioLabel = styled.p`
  color: ${({ theme }) => theme.colors.black[400]};
  font-size: 16px;
  font-weight: 600;
`;
