import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { theme } from '../../../../styles/theme';
import { CardHours } from "./styles";

interface HorariosFuncionamentoProps {
    horarios: {
        abertura: string;
        fechamento: string;
        diaSemana: string;
    }[];
}

export const HorariosFuncionamento: React.FC<HorariosFuncionamentoProps> = ({ horarios }) => {
    const diasSemanaCompleto = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    return (
        <CardHours >
            <Typography variant="body1" color={ theme.colors.black[300] }>
                Nossos horários de funcionamento
            </Typography>
            <Grid container spacing={4}>
                {horarios.map((horario, index) => (
                    <Grid item xs={12} sm={1.71} key={index}>
                        <Card variant="elevation" sx={{ borderRadius: '24px', boxShadow: 3 }}>
                            <CardContent>
                                <Typography mb={4} textAlign='center' variant="body2" style={{ color: theme.colors.black[500], fontWeight: 800 }}>
                                    {diasSemanaCompleto[index]}
                                </Typography>
                                <Typography textAlign='center' variant="body2" color={ theme.colors.black[300] }>
                                {formatTime(horario.abertura)} às {formatTime(horario.fechamento)}
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
