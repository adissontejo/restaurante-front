import { z } from "zod";

export const schema = z.object({
  nome: z.string().min(3, "Nome muito curto!").max(100, "Nome muito longo!"),
  email: z.string().email("Email inválido!").max(100, "Email muito longo!"),
  fotoPerfil: z.any().optional(),
});
