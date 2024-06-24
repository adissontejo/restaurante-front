import React from "react";
import { Typography, Stack } from "@mui/material";
import { Line } from "./styles";
import { theme } from "../../styles/theme";
import { LoginButton } from "../LoginButton";
import { Button } from "../Button";

interface TitleWithUnderlineProps {
  text: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  text,
  buttonText,
  buttonAction,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography
        variant="h4"
        sx={{
          position: "relative",
          display: "inline-block",
          pb: 2,
          color: theme.colors.black[600],
          fontWeight: 700,
        }}
      >
        {text}
        <Line />
      </Typography>
      {!buttonText && !buttonAction && (
        <LoginButton>Logar com o Google</LoginButton>
      )}
      {(buttonText || buttonAction) && (
        <Button onClick={buttonAction} variant="dark">
          {buttonText}
        </Button>
      )}
    </Stack>
  );
};
