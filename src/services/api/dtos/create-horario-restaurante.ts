import { DiaSemana } from "./horario-restaurante";

export interface CreateHorarioRestaurateDTO {
  abertura: string;
  fechamento: string;
  diaSemana: DiaSemana;
}
