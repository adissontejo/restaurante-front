import { CreateHorarioRestaurateDTO } from "./create-horario-restaurante.dto";

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
