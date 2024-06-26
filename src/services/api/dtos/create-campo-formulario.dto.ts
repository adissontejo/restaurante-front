export enum TipoCampo {
  INPUT = "input",
  SELECT = "select",
  MULTISELECT = "multiselect",
}

export interface CreateCampoFormularioDTO {
  nome: string;
  tipoCampo: TipoCampo;
  qtMinOpcoes?: number;
  qtMaxOpcoes?: number;
  opcoes: string[];
  obrigatorio: boolean;
}
