import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(12, 1fr);
`;

export const GridItem = styled.div<{ span?: number }>`
  grid-column: auto / span ${({ span = 12 }) => span};
`;
