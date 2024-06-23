import { DiaSemana } from "./create-horario-restaurante.dto";

export interface HorarioRestauranteResponseDTO {
  abertura: string;
  fechamento: string;
  diaSemana: DiaSemana;
}
