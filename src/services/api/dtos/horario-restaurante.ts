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
