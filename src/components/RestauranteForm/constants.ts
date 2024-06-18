import { z } from "zod";
import { DiaSemana } from "../services/api/dtos/horario-restaurante";

export const WeekDays = [
  {
    label: "Segunda-Feira",
    value: DiaSemana.seg,
  },
  {
    label: "Terça-Feira",
    value: DiaSemana.ter,
  },
  {
    label: "Quarta-Feira",
    value: DiaSemana.qua,
  },
  {
    label: "Quinta-Feira",
    value: DiaSemana.qui,
  },
  {
    label: "Sexta-Feira",
    value: DiaSemana.sex,
  },
  {
    label: "Sábado",
    value: DiaSemana.sab,
  },
  {
    label: "Domingo",
    value: DiaSemana.dom,
  },
];

export const exibitionSchema = z.object({
  nome: z.string().min(3, "Nome muito curto!").max(100, "Nome muito longo!"),
  dominio: z
    .string()
    .min(3, "Domínio muito curto!")
    .max(20, "Domínio muito longo!")
    .regex(/^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)$/, "Domínio no formato incorreto!"),
});
