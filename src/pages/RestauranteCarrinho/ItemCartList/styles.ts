import styled from "styled-components";

export const ListItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: ${({ theme }) => theme.colors.beige[500]};
  border-radius: 24px;
`;
