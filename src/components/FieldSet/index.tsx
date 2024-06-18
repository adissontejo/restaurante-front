import { FormGroup, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface FieldSetProps {
  title?: string;
  children?: ReactNode;
}

export const FieldSet = ({ title, children }: FieldSetProps) => {
  return (
    <Grid container spacing={4}>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        {title}
      </Typography>
      <FormGroup sx={{ gap: 4 }}>{children}</FormGroup>
    </Grid>
  );
};
