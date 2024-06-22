export enum DiaSemana {
  seg = "seg",
  ter = "ter",
  qua = "qua",
  qui = "qui",
  sex = "sex",
  sab = "sab",
  dom = "dom",
}

export interface HorarioRestauranteDTO {
  diaSemana: DiaSemana;
  abertura: string;
  fechamento: string;
}

export interface RestauranteDTO {
  id: number;
  nome: string;
  descricao?: string;
  rua: string;
  numero: number;
  cep: string;
  complemento: string | null;
  dominio: string;
  bairro: string;
  cidade: string;
  estado: string;
  qtPedidosFidelidade: number | null;
  valorFidelidade: number | null;
  logoUrl: string | null;
  horarios: HorarioRestauranteDTO[];
}
