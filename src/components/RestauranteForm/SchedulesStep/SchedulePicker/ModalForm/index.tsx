import { Delete } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { AddButton } from "../../../../AddButton";
import {
  Bottom,
  ButtonsWrapper,
  ConnectorText,
  Container,
  TimeCard,
  Times,
} from "./styles";
import { ControlledBooleanRadio } from "../../../../BooleanRadio";
import { Button } from "../../../../Button";
import { ControlledTimePicker } from "../../../../TimePicker";
import { ModalCard } from "../../../../ModalCard";
import { useEffect } from "react";

export interface Horario {
  abertura: Date;
  fechamento: Date;
}

interface FormData {
  mode: "open" | "closed";
  horarios: {
    abertura: Date | null;
    fechamento: Date | null;
  }[];
}

export interface ModalFormProps {
  weekDay: string;
  initialValue: Horario[];
  onSave: (value: Horario[]) => void;
  onClose: () => void;
  onResize: () => void;
}

export const ModalForm = ({
  weekDay,
  initialValue,
  onSave,
  onClose,
  onResize,
}: ModalFormProps) => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      mode: initialValue.length ? "open" : "closed",
      horarios: initialValue.length
        ? initialValue
        : [
            {
              abertura: null,
              fechamento: null,
            },
          ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "horarios",
    rules: {
      minLength: 1,
    },
  });

  const horarios = watch("horarios");
  const mode = watch("mode");

  const getMaxAbertura = (index: number) => {
    const { fechamento } = horarios[index];

    if (!fechamento?.getTime()) {
      return undefined;
    }

    return new Date(fechamento.getTime() - 60 * 1000);
  };

  const getMinFechamento = (index: number) => {
    const { abertura } = horarios[index];

    if (!abertura?.getTime()) {
      return undefined;
    }

    return new Date(abertura.getTime() + 60 * 1000);
  };

  const handleSave = () => {
    if (mode === "closed") {
      onSave([]);
    } else {
      const filtered = horarios.filter(({ abertura, fechamento }) => {
        if (!abertura?.getTime() || !fechamento?.getTime()) {
          return false;
        }

        return abertura.getTime() < fechamento.getTime();
      }) as Horario[];

      onSave(filtered);
    }

    onClose();
  };

  useEffect(() => {
    onResize();
  }, [horarios.length, mode]);

  return (
    <ModalCard title={`Editar horário - ${weekDay}`} onClose={onClose}>
      <Container>
        <ControlledBooleanRadio
          control={control}
          name="mode"
          label="O restaurante é aberto nesse dia?"
          onLabel="Sim"
          offLabel="Não"
          onValue="open"
          offValue="closed"
        />
        {mode === "open" && (
          <Times>
            {fields.map((field, index) => (
              <TimeCard key={field.id}>
                <ControlledTimePicker
                  control={control}
                  name={`horarios.${index}.abertura`}
                  ampm={false}
                  maxTime={getMaxAbertura(index)}
                />
                <ConnectorText>às</ConnectorText>
                <ControlledTimePicker
                  control={control}
                  name={`horarios.${index}.fechamento`}
                  ampm={false}
                  minTime={getMinFechamento(index)}
                />
                <IconButton onClick={() => fields.length > 1 && remove(index)}>
                  <Delete />
                </IconButton>
              </TimeCard>
            ))}
            <AddButton
              onClick={() => append({ abertura: null, fechamento: null })}
            >
              Adicionar Horário
            </AddButton>
          </Times>
        )}
        <Bottom>
          <Divider />
          <ButtonsWrapper>
            <Button variant="light" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="dark" onClick={handleSubmit(handleSave)}>
              Salvar
            </Button>
          </ButtonsWrapper>
        </Bottom>
      </Container>
    </ModalCard>
  );
};
