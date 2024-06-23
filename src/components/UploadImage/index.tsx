import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Container,
  EditButton,
  IconWrapper,
  Image,
  ImageWrapper,
  Label,
  Wrapper,
} from "./styles";
import Pencil from "../../assets/pencil.svg?react";
import { useId } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export interface UploadImageProps {
  value?: File;
  onChange?: (value?: File) => void;
  label?: string;
  placeholderUrl?: string;
}

export const UploadImage = ({
  label,
  value,
  onChange,
  placeholderUrl,
}: UploadImageProps) => {
  const id = useId();

  return (
    <Container>
      <Wrapper>
        {label && <Label>{label}</Label>}
        <input
          id={id}
          type="file"
          style={{ display: "none" }}
          onChange={(e) =>
            e.target.files?.[0] && onChange?.(e.target.files?.[0])
          }
          accept="image/jpeg, image/png, image/jpg"
        />
        <label htmlFor={id}>
          <ImageWrapper>
            {value || placeholderUrl ? (
              <Image
                src={value ? URL.createObjectURL(value) : placeholderUrl}
              />
            ) : (
              <IconWrapper>
                <AddPhotoAlternate
                  sx={{ width: 40, height: 40, color: "#666666" }}
                />
              </IconWrapper>
            )}
            <EditButton>
              <Pencil />
            </EditButton>
          </ImageWrapper>
        </label>
      </Wrapper>
    </Container>
  );
};

export interface ControlledUploadImageProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends UploadImageProps {
  control: ControllerProps<TFieldValues, TName>["control"];
  name: TName;
}

export const ControlledUploadImage = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  ...rest
}: ControlledUploadImageProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <UploadImage {...rest} {...field} />}
    />
  );
};
