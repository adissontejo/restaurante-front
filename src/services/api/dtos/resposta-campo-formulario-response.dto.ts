import { CampoFormularioResponseDTO } from "./campo-formluario-response.dto";
import { OpcaoSelecionadaResponseDTO } from "./opcao-selecionada-response.dto";

export interface RespostaCampoFormularioResponseDTO {
  id: number;
  campoFormulario: CampoFormularioResponseDTO;
  resposta: string | null;
  opcoes: OpcaoSelecionadaResponseDTO[] | null;
}
