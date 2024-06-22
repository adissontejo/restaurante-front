import { DiaSemana } from "./restaurante";

export interface CreateHorarioRestaurateDTO {
  abertura: string;
  fechamento: string;
  diaSemana: DiaSemana;
}

export interface CreateRestauranteDTO {
  nome: string;
  descricao?: string;
  rua: string;
  numero: number;
  cep: string;
  complemento?: string;
  dominio: string;
  horarios: CreateHorarioRestaurateDTO[];
  qtPedidosFidelidade?: number;
  valorFidelidade?: number;
  logo?: File;
}
