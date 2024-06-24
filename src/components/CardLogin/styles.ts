import styled from "styled-components";

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: 10px;
`;
