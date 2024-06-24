import { Cargo } from "./services/api/dtos/create-funcionario.dto";
import { DiaSemana } from "./services/api/dtos/create-horario-restaurante.dto";

export const WeekDays = [
  {
    label: "Segunda",
    value: DiaSemana.seg,
  },
  {
    label: "Terça",
    value: DiaSemana.ter,
  },
  {
    label: "Quarta",
    value: DiaSemana.qua,
  },
  {
    label: "Quinta",
    value: DiaSemana.qui,
  },
  {
    label: "Sexta",
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

export const cargos = [
  {
    label: "Administrador",
    value: Cargo.ADMIN,
  },
  {
    label: "Cozinheiro",
    value: Cargo.COZINHEIRO,
  },
  {
    label: "Garçom",
    value: Cargo.GARCOM,
  },
  {
    label: "Dono",
    value: Cargo.DONO,
  },
];
