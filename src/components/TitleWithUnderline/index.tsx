import React from "react";
import { Typography, Stack } from "@mui/material";
import { Line } from "./styles";
import { theme } from "../../styles/theme";
import { LoginButton } from "../LoginButton";

interface TitleWithUnderlineProps {
  text: string;
}

export const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  text,
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
      <LoginButton>Logar com o Google</LoginButton>
    </Stack>
  );
};
