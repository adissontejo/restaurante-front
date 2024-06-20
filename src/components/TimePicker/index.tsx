import {
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from "@mui/x-date-pickers";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export interface TimePickerProps extends MuiTimePickerProps<Date, false> {}

export const TimePicker = ({ ...rest }: TimePickerProps) => {
  return <MuiTimePicker {...rest} />;
};

export interface ControlledTimePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends TimePickerProps {
  control: ControllerProps<TFieldValues, TName>["control"];
  name: TName;
}

export const ControlledTimePicker = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  ...rest
}: ControlledTimePickerProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TimePicker {...rest} {...field} />}
    />
  );
};
