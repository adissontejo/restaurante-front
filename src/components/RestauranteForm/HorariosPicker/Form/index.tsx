import { Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  FormGroup,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { Controller, useFieldArray, useForm } from "react-hook-form";

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

export interface FormProps {
  initialValue: Horario[];
  onSave: (value: Horario[]) => void;
}

export const Form = ({ initialValue, onSave }: FormProps) => {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      horarios: initialValue.length
        ? initialValue
        : [
            {
              abertura: null,
              fechamento: null,
            },
          ],
      mode: initialValue.length ? "open" : "closed",
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

    return fechamento.getTime() - 60 * 1000;
  };

  const getMinFechamento = (index: number) => {
    const { abertura } = horarios[index];

    if (!abertura?.getTime()) {
      return undefined;
    }

    return abertura.getTime() + 60 * 1000;
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
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: "white", padding: 4 }}>
      <Controller
        name="mode"
        control={control}
        render={({ field }) => (
          <ToggleButtonGroup color="primary" fullWidth exclusive {...field}>
            <ToggleButton value="open">Aberto</ToggleButton>
            <ToggleButton value="closed">Fechado</ToggleButton>
          </ToggleButtonGroup>
        )}
      />
      <FormGroup
        sx={{
          gap: 4,
          overflow: "hidden",
          height: mode === "open" ? "auto" : 0,
          marginTop: mode === "open" ? 4 : 0,
          flexWrap: "nowrap",
        }}
      >
        {fields.map((field, index) => (
          <FormGroup key={field.id} row sx={{ gap: 4, alignItems: "center" }}>
            <Controller
              name={`horarios.${index}.abertura`}
              control={control}
              render={({ field }) => (
                <TimePicker
                  ampm={false}
                  sx={{ flex: 1 }}
                  value={field.value}
                  maxTime={getMaxAbertura(index)}
                  onChange={field.onChange}
                />
              )}
            />
            <Typography variant="body1">às</Typography>
            <Controller
              name={`horarios.${index}.fechamento`}
              control={control}
              render={({ field }) => (
                <TimePicker
                  ampm={false}
                  sx={{ flex: 1 }}
                  value={field.value}
                  minTime={getMinFechamento(index)}
                  onChange={field.onChange}
                />
              )}
            />
            <IconButton onClick={() => fields.length > 1 && remove(index)}>
              <Delete />
            </IconButton>
          </FormGroup>
        ))}
      </FormGroup>
      <Stack direction="row" spacing={4} sx={{ marginTop: 4 }}>
        <Button
          variant="outlined"
          onClick={() => append({ abertura: null, fechamento: null })}
          fullWidth
          disabled={mode === "closed"}
        >
          Novo
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(handleSave)}
          fullWidth
        >
          Salvar
        </Button>
      </Stack>
    </Card>
  );
};
