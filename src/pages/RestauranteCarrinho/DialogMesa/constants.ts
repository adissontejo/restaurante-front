import { z } from "zod";

export const schema = z.object({
  numeroMesa: z.coerce
    .number({ invalid_type_error: "Número inválido!" })
    .int("Número inválido!")
    .positive(),
});
