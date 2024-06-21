import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.black[400]};
  font-size: 16px;
  font-weight: 600;
`;
