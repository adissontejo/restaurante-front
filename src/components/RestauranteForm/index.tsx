import { Button, Container, Stack, TextField, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Horario, HorariosPicker } from "./HorariosPicker";
import { useState } from "react";
import { DiaSemana } from "../services/api/dtos/horario-restaurante";
import { Stepper } from "react-form-stepper";
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import { WeekDays, exibitionSchema } from "./constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultHorarios = Object.values(DiaSemana).reduce((acc, curr) => {
  const abertura = new Date();
  const fechamento = new Date();

  abertura.setHours(8, 0, 0);
  fechamento.setHours(22, 0, 0);

  return {
    ...acc,
    [curr]: [
      {
        abertura,
        fechamento,
      },
    ],
  };
}, {} as Record<DiaSemana, Horario[]>);

export const RestauranteForm = () => {
  const theme = useTheme();

  const exibitionForm = useForm({
    reValidateMode: "onBlur",
    resolver: zodResolver(exibitionSchema),
  });

  const [activeStep, setActiveStep] = useState(0);
  const [openHorarioPicker, setOpenHorarioPicker] = useState<DiaSemana | null>(
    null
  );
  const [horarios, setHorarios] =
    useState<Record<DiaSemana, Horario[]>>(defaultHorarios);

  console.log(exibitionForm.formState.errors);

  const updateHorarios = (diaSemana: DiaSemana, horarios: Horario[]) => {
    setHorarios((prev) => ({
      ...prev,
      [diaSemana]: horarios,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={4}>
        <Stepper
          activeStep={activeStep}
          steps={[
            { label: "Informações de exibição" },
            { label: "Endereço" },
            { label: "Horários" },
          ]}
          styleConfig={
            {
              activeBgColor: theme.palette.primary.main,
              completedBgColor: theme.palette.primary.dark,
            } as StepStyleDTO
          }
        />
        {activeStep === 0 && (
          <Grid container spacing={4} columns={12}>
            <Grid xs={6}>
              <TextField
                label="Nome"
                fullWidth
                required
                {...exibitionForm.register("name", { required: true })}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label="Domínio"
                fullWidth
                required
                {...exibitionForm.register("domain", { required: true })}
              />
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={4}>
            <Grid xs={12}>
              <TextField label="CEP" fullWidth />
            </Grid>
            <Grid xs={6}>
              <TextField disabled label="Cidade" sx={{ flex: 1 }} fullWidth />
            </Grid>
            <Grid xs={6}>
              <TextField disabled label="Estado" fullWidth />
            </Grid>
            <Grid xs={12}>
              <TextField label="Bairro" fullWidth />
            </Grid>
            <Grid xs={12}>
              <TextField label="Rua" fullWidth />
            </Grid>
            <Grid xs={4}>
              <TextField label="Número" fullWidth />
            </Grid>
            <Grid xs={8}>
              <TextField label="Complemento" fullWidth />
            </Grid>
          </Grid>
        )}
        {activeStep === 2 && (
          <Stack direction="column" spacing={4} padding={2}>
            {WeekDays.map((item) => (
              <HorariosPicker
                key={item.value}
                weekDay={item.label}
                value={horarios[item.value]}
                isOpen={openHorarioPicker === item.value}
                onOpen={() => setOpenHorarioPicker(item.value)}
                onChange={(horarios) => updateHorarios(item.value, horarios)}
                onClose={() => setOpenHorarioPicker(null)}
              />
            ))}
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={4}
          padding={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            sx={{ opacity: activeStep === 0 ? 0 : 1 }}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            sx={{ opacity: activeStep === 2 ? 0 : 1 }}
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            Próximo
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
