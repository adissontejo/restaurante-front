export interface CreateUsuarioDTO {
  nome: string;
  email: string;
  dataNascimento: string;
  fotoPerfil?: File;
  fotoPerfilUrl?: string;
  celular?: string;
}
