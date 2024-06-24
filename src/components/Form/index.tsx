import { TextField, TextFieldProps } from "@mui/material";
import { Grid, GridItem, GridProps } from "../Grid";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import InputMask from "react-input-mask";
import { MenuItem } from "@mui/material";

export interface FormProps extends GridProps {}

export const Form = ({ children, ...rest }: FormProps) => {
  return <Grid {...rest}>{children}</Grid>;
};

export interface FormFieldProps
  extends Omit<TextFieldProps<"outlined">, "variant"> {
  span?: number;
  mask?: string;
}

export const FormField = ({ span, mask, ...rest }: FormFieldProps) => {
  return (
    <GridItem span={span}>
      {mask ? (
        <InputMask mask={mask} {...(rest as any)}>
          <TextField fullWidth variant="outlined" {...rest} />
        </InputMask>
      ) : (
        <TextField fullWidth {...rest} variant="outlined" />
      )}
    </GridItem>
  );
};

export interface ControlledFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FormFieldProps {
  control: ControllerProps<TFieldValues, TName>["control"];
  name: TName;
  options?: { label: string; value: any }[]; // Adicionando a propriedade options
}

export const ControlledFormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  options,
  select,
  ...rest
}: ControlledFormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          {...rest}
          {...field}
          select={select}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {select &&
            options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </FormField>
      )}
    />
  );
};
