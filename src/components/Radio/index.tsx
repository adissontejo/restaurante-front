import { Radio as MuiRadio, RadioProps as MuiRadioProps } from "@mui/material";
import { Container, Label } from "./styles";

export interface RadioProps extends MuiRadioProps {
  label?: string;
}

export const Radio = ({ label, ...rest }: RadioProps) => {
  return (
    <Container>
      <MuiRadio {...rest} />
      <Label>{label}</Label>
    </Container>
  );
};
