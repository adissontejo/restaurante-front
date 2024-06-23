import { Container, Label, Value } from "./styles";

export interface InfoCardProps {
  label?: string;
  value?: string | number;
}

export const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  );
};
