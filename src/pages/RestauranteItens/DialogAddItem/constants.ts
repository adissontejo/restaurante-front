import { z } from "zod";

export const schema = z.object({
  quantidade: z.coerce
    .number({ invalid_type_error: "Número inválido!" })
    .positive("Número inválido!")
    .int("Número inválido!"),
  observacao: z.string().max(400, "Observação muito grande!").optional(),
});
