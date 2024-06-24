import { CreateCampoFormularioDTO } from "./create-campo-formulario.dto";

export interface CreateItemDTO {
  nome: string;
  preco: number;
  habilitado?: boolean;
  restauranteId: number;
  categoria: string;
  campos?: CreateCampoFormularioDTO[];
  foto?: File;
}
