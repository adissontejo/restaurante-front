export enum Cargo {
  DONO = "dono",
  ADMIN = "admin",
  COZINHEIRO = "cozinheiro",
  GARCOM = "garcom",
}
export interface CreateFuncionarioDTO {
  cargo: Cargo;
  usuarioId: number;
  restauranteId: number;
}
