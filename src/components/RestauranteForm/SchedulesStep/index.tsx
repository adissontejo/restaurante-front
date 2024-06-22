import { UseFormReturn } from "react-hook-form";
import { SchedulePicker } from "./SchedulePicker";
import { WeekDays } from "../constants";
import { Container } from "./styles";
import { Horario } from "./SchedulePicker/ModalForm";
import { DiaSemana } from "../../../services/api/dtos/restaurante";

export interface SchedulesFormData extends Record<DiaSemana, Horario[]> {}

export interface SchedulesStepProps {
  form: UseFormReturn<SchedulesFormData>;
}

export const SchedulesStep = ({ form }: SchedulesStepProps) => {
  const { watch, setValue } = form;

  const values = watch();

  return (
    <Container>
      {WeekDays.map((day) => (
        <SchedulePicker
          key={day.value}
          value={values[day.value]}
          onChange={(value) => setValue(day.value, value)}
          weekDay={day.label}
        />
      ))}
    </Container>
  );
};
