import styled from "styled-components";

export const Container = styled.button`
  padding: 12px 22px;

  background: ${({ theme }) => theme.colors.white[500]};
  border-radius: 4px;

  cursor: pointer;
  transition: filter 0.2s;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(0.85);
  }
`;

export const Label = styled.p`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black[600]};
  font-size: 18px;
  font-weight: 500;
`;
