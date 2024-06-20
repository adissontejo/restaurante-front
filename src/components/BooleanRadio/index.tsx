import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Radio } from "../Radio";
import { Container, Label } from "./styles";
import { RadioGroup } from "@mui/material";

export interface BooleanRadioProps {
  label?: string;
  onValue?: string;
  offValue?: string;
  offLabel?: string;
  onLabel?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const BooleanRadio = ({
  value,
  label,
  onValue,
  offValue,
  offLabel,
  onLabel,
  onChange,
}: BooleanRadioProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <RadioGroup
        value={value}
        onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
        row
        sx={{ gap: "24px" }}
      >
        <Radio label={onLabel} value={onValue} />
        <Radio label={offLabel} value={offValue} />
      </RadioGroup>
    </Container>
  );
};

export interface ControlledBooleanRadioProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends BooleanRadioProps {
  control: ControllerProps<TFieldValues, TName>["control"];
  name: TName;
}

export const ControlledBooleanRadio = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  ...rest
}: ControlledBooleanRadioProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <BooleanRadio {...rest} {...field} />}
    />
  );
};
