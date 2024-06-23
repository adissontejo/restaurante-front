import styled from "styled-components";

export const Container = styled.div<{ active: boolean }>`
  padding: 24px 32px;
  width: 100%;
  text-align: center;

  background: ${({ theme, active }) =>
    active ? theme.colors.beige[500] : "transparent"};

  path {
    fill: ${({ theme, active }) =>
      active ? theme.colors.brown[500] : theme.colors.white};
  }

  &:hover {
    background: rgba(107, 55, 12, 0.5);
    cursor: pointer;
  }
`;
