import { Button, Popper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { useMemo, useRef } from "react";
import { Form, Horario } from "./Form";

export type { Horario };

export interface HorariosPickerProps {
  weekDay: string;
  value: Horario[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: Horario[]) => void;
}

export const HorariosPicker = ({
  weekDay,
  value,
  isOpen,
  onOpen,
  onClose,
  onChange,
}: HorariosPickerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const valueDisplay = useMemo(() => {
    if (!value.length) {
      return "Fechado";
    }

    return value
      .map(({ abertura, fechamento }) => {
        return (
          format(abertura, "HH:mm'h'") + format(fechamento, "' às' HH:mm'h'")
        );
      })
      .join(", ");
  }, [value]);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      <Typography variant="body1" whiteSpace="nowrap">
        {weekDay}
      </Typography>
      <Button
        ref={buttonRef}
        variant="text"
        sx={{ textTransform: "none" }}
        onClick={isOpen ? onClose : onOpen}
      >
        <Typography variant="body1" color="black" align="right">
          {valueDisplay}
        </Typography>
      </Button>
      <Popper
        anchorEl={buttonRef.current}
        placement="bottom-end"
        open={isOpen}
        sx={{ zIndex: 100 }}
      >
        <Form
          initialValue={value}
          onSave={(value) => [onClose(), onChange(value)]}
        />
      </Popper>
    </Stack>
  );
};
