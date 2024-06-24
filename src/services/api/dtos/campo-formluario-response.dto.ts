import { TipoCampo } from "./create-campo-formulario.dto";
import { OpcaoResponseDTO } from "./opcao-response.dto";

export interface CampoFormularioResponseDTO {
  id: number;
  nome: string;
  tipoCampo: TipoCampo;
  qtMinOpcoes?: number;
  qtMaxOpcoes?: number;
  opcoes?: OpcaoResponseDTO[];
  obrigatorio: boolean;
}

export interface CampoFormularioResponseWithoutOpcoesDTO
  extends Omit<CampoFormularioResponseDTO, "opcoes"> {}
