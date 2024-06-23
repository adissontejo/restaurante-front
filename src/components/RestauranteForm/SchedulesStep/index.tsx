import { UseFormReturn } from "react-hook-form";
import { SchedulePicker } from "./SchedulePicker";
import { Container } from "./styles";
import { Horario } from "./SchedulePicker/ModalForm";
import { WeekDays } from "../../../constants";
import { DiaSemana } from "../../../services/api/dtos/create-horario-restaurante.dto";

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
