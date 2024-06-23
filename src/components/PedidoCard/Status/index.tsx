import { FC, SVGAttributes } from "react";
import { Container, Label, StatusVariant } from "./styles";

export interface StatusProps {
  variant?: StatusVariant;
  label?: string;
  icon?: FC<SVGAttributes<SVGSVGElement>>;
  onClick?: () => void;
}

export const Status = ({
  variant,
  label,
  icon: Icon,
  onClick,
}: StatusProps) => {
  return (
    <Container
      variant={variant || "backlog"}
      clickable={!!onClick}
      onClick={onClick && ((e) => [e.stopPropagation(), onClick()])}
    >
      {Icon && <Icon />}
      <Label>{label}</Label>
    </Container>
  );
};
