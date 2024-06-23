export enum TipoCampo {
  INPUT = "input",
  SELECT = "select",
}

export interface CreateCampoFormularioDTO {
  nome: string;
  tipoCampo: TipoCampo;
  qtMinOpcoes?: number;
  qtMaxOpcoes?: number;
  opcoes: string[];
}
