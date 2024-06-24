import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { formatarEndereco } from "../../utils";
import { Line } from "./styles";
import { theme } from "../../styles/theme";
import { RestauranteResponseDTO } from "../../services/api/dtos/restaurante-response.dto";
import { HorarioRestauranteResponseDTO } from "../../services/api/dtos/horario-restaurante-response.dto";
import { format, addDays, parseISO, startOfDay, startOfWeek, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CardCarouselProps {
  restaurante: RestauranteResponseDTO;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ restaurante }) => {
    const { status, nextOpen } = getStatus(restaurante.horarios);

    return (
        <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", textTransform: 'none' }}
        >
            <Box sx={{ height: "120px", width: "120px", zIndex: 1 }}>
                <CardMedia
                component="img"
                image={restaurante.logoUrl ? restaurante.logoUrl : ""}
                alt={restaurante.nome}
                style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "100px",
                    border: "4px solid #fff",
                }}
                />
            </Box>
            <Card
                variant="elevation"
                sx={{
                width: 400,
                paddingTop: "70px",
                marginTop: "-70px",
                borderRadius: "24px",
                boxShadow: 3,
                }}
            >
                <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                <Box
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    }}
                >
                    <Typography gutterBottom variant="h6" style={{ fontWeight: 800 }}>
                    {restaurante.nome}
                    </Typography>
                    <Typography
                    gutterBottom
                    variant="body1"
                    style={{ fontWeight: 600, color: status === "aberto" ? theme.colors.green[400] : theme.colors.black[300] }}
                    >
                    {status === "aberto" ? "aberto" : nextOpen}
                    </Typography>
                </Box>
                <Line />
                <Box sx={{ padding: '10px' }}>
                    <Typography variant="body2" color="text.secondary">
                    Localização
                    </Typography>
                    <Typography
                    variant="body2"
                    style={{ fontWeight: 600, color: theme.colors.black[500], whiteSpace: 'pre-wrap' }}
                    >
                    {formatarEndereco(
                        restaurante.rua,
                        restaurante.numero,
                        restaurante.complemento,
                        restaurante.cep,
                        restaurante.bairro,
                        restaurante.cidade,
                        restaurante.estado
                    )}
                    </Typography>
                </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

function getStatus(horarios: HorarioRestauranteResponseDTO[]) {
    const diasSemanaMap: { [key: string]: number } = { dom: 0, seg: 1, ter: 2, qua: 3, qui: 4, sex: 5, sab: 6 };
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinutes; // Hora atual em minutos

    const todaySchedule = horarios.find((h) => diasSemanaMap[h.diaSemana] === dayOfWeek);

    if (todaySchedule) {
        const openingTime = parse(todaySchedule.abertura, 'HH:mm', new Date());
        const closingTime = parse(todaySchedule.fechamento, 'HH:mm', new Date());

        const openingHour = openingTime.getHours();
        const openingMinutes = openingTime.getMinutes();
        const openingTimeInMinutes = openingHour * 60 + openingMinutes;

        const closingHour = closingTime.getHours();
        const closingMinutes = closingTime.getMinutes();
        const closingTimeInMinutes = closingHour * 60 + closingMinutes;

        if (currentTime >= openingTimeInMinutes && currentTime <= closingTimeInMinutes) {
            return { status: "aberto", nextOpen: null };
        }
    }

    // Verifica os próximos dias
    let nextOpenTime: Date | null = null;
    let nextOpenDayName: string | null = null;

    for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (dayOfWeek + i) % 7;
        const nextDaySchedule = horarios.find((h) => diasSemanaMap[h.diaSemana] === nextDayIndex);

        if (nextDaySchedule) {
            nextOpenTime = startOfDay(addDays(startOfWeek(now, { weekStartsOn: 0 }), i));
            nextOpenTime.setHours(parseInt(nextDaySchedule.abertura.split(":")[0], 10));
            nextOpenTime.setMinutes(parseInt(nextDaySchedule.abertura.split(":")[1], 10));
            nextOpenDayName = format(addDays(startOfWeek(now, { weekStartsOn: 0 }), i), "EEEE", { locale: ptBR }); // Nome do dia em português
            break;
        }
    }

    return {
        status: "fechado",
        nextOpen: nextOpenTime ? `abre ${nextOpenDayName} às ${format(nextOpenTime, "HH:mm")}` : "fechado",
    };
  }
