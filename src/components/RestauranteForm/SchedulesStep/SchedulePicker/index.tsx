import { useMemo, useRef, useState } from "react";
import { Container, EditButton, Label, SelectorWrapper, Value } from "./styles";
import { format } from "date-fns";
import Pencil from "../../../../assets/pencil.svg?react";
import { Horario, ModalForm } from "./ModalForm";
import { Popover, PopoverActions } from "@mui/material";

export interface SchedulePickerProps {
  value: Horario[];
  onChange: (value: Horario[]) => void;
  weekDay: string;
}

export const SchedulePicker = ({
  value,
  onChange,
  weekDay,
}: SchedulePickerProps) => {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverActions = useRef<PopoverActions>(null);

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
    <Container>
      <Label>{weekDay}</Label>
      <SelectorWrapper>
        <Value>{valueDisplay}</Value>
        <EditButton ref={buttonRef} onClick={() => setOpen((value) => !value)}>
          <Pencil />
        </EditButton>
        <Popover
          action={popoverActions}
          anchorEl={buttonRef.current}
          open={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ModalForm
            weekDay={weekDay}
            initialValue={value}
            onSave={onChange}
            onClose={() => setOpen(false)}
            onResize={() => popoverActions.current?.updatePosition()}
          />
        </Popover>
      </SelectorWrapper>
    </Container>
  );
};
