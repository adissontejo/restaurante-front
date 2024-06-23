export enum DiaSemana {
  seg = "seg",
  ter = "ter",
  qua = "qua",
  qui = "qui",
  sex = "sex",
  sab = "sab",
  dom = "dom",
}

export interface CreateHorarioRestaurateDTO {
  abertura: string;
  fechamento: string;
  diaSemana: DiaSemana;
}
