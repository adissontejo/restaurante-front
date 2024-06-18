import { Container, FormGroup, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface FormProps {
  title?: string;
  children?: ReactNode;
}

export const Form = ({ title, children }: FormProps) => {
  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={8}>
        <Typography variant="h3">{title}</Typography>
        <FormGroup sx={{ gap: 4 }}>{children}</FormGroup>
      </Stack>
    </Container>
  );
};
