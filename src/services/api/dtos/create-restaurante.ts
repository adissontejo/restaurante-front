import { CreateHorarioRestaurateDTO } from "./create-horario-restaurante";

export interface CreateRestauranteDTO {
  nome: string;
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
