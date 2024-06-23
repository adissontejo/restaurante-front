import React, { Fragment, useMemo } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { CardHours } from "./styles";
import { theme } from "../../../styles/theme";
import { WeekDays } from "../../../constants";
import { HorarioRestauranteResponseDTO } from "../../../services/api/dtos/horario-restaurante-response.dto";

interface HorariosFuncionamentoProps {
  horarios: HorarioRestauranteResponseDTO[];
}

export const HorariosFuncionamento: React.FC<HorariosFuncionamentoProps> = ({
  horarios,
}) => {
  const horariosByDiaSemana = useMemo(() => {
    return WeekDays.map((item) => {
      return horarios
        .filter((horario) => horario.diaSemana === item.value)
        .map(
          (horario) =>
            `${formatTime(horario.abertura)} às ${formatTime(
              horario.fechamento
            )}`
        );
    });
  }, [horarios]);

  return (
    <CardHours>
      <Typography variant="body1" color={theme.colors.black[300]}>
        Nossos horários de funcionamento
      </Typography>
      <Grid container spacing={4}>
        {WeekDays.map((item, index) => (
          <Grid item sx={{ height: "100%" }} xs={12} sm={1.71} key={index}>
            <Card
              variant="elevation"
              sx={{ borderRadius: "24px", boxShadow: 3, height: "100%" }}
            >
              <CardContent>
                <Typography
                  mb={4}
                  textAlign="center"
                  variant="body2"
                  style={{ color: theme.colors.black[500], fontWeight: 800 }}
                >
                  {item.label}
                </Typography>
                <Typography
                  textAlign="center"
                  variant="body2"
                  color={theme.colors.black[300]}
                >
                  {horariosByDiaSemana[index].length
                    ? horariosByDiaSemana[index].map((horario, index) => (
                        <Fragment key={index}>
                          {index > 0 && <br />}
                          <span>{horario}</span>
                        </Fragment>
                      ))
                    : "Fechado"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CardHours>
  );
};

// Função para formatar o horário no formato HH:MM
const formatTime = (time: string) => {
  return time.substring(0, 5); // Retorna apenas a parte HH:MM
};
