import { UsuarioResponseDTO } from "./usuario-response.dto";

export interface FuncionarioResponseDTO {
  id: number;
  cargo: string;
  usuarioId: number;
  restauranteId: number;
  usuario: UsuarioResponseDTO;
}
