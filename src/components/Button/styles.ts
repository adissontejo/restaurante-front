import styled from "styled-components";

export const Label = styled.p`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
`;

export const Container = styled.button<{ variant: "light" | "dark" }>`
  padding: 12px 22px;

  width: 270px;
  background: ${({ variant, theme }) =>
    variant === "light" ? theme.colors.white[500] : theme.colors.black[600]};
  border-radius: 4px;

  cursor: pointer;
  transition: filter 0.2s;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2);

  ${Label} {
    color: ${({ variant, theme }) =>
      variant === "light" ? theme.colors.black[600] : theme.colors.white[500]};
  }

  &:hover {
    filter: brightness(${({ variant }) => (variant === "light" ? 0.85 : 1.15)});
  }
`;
