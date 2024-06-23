import { CampoFormularioResponseDTO } from "./campo-formluario-response.dto";
import { InstanciaItemResponseDTO } from "./instancia-item-response.dto";

export interface ItemResponseDTO {
  id: number;
  nome: string;
  habilitado: boolean;
  campos: CampoFormularioResponseDTO[];
  instanciaAtiva: InstanciaItemResponseDTO;
  fotoUrl: string | null;
}

export interface ItemResponseWithoutInstanciaDTO
  extends Omit<ItemResponseDTO, "instanciaAtiva" | "campos"> {}
