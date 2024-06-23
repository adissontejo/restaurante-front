import { CreateCampoFormularioDTO } from "./create-campo-formulario.dto";

export interface CreateItemDTO {
  nome: string;
  preco: number;
  habilitado?: boolean;
  categoriaId: number;
  campos?: CreateCampoFormularioDTO[];
  foto?: File;
}
