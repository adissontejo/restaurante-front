import { z } from "zod";

export const schema = z.object({
  nome: z
    .string({ required_error: "Preencha o nome!" })
    .min(3, "Nome muito curto!")
    .max(100, "Nome muito longo!"),
  preco: z.coerce
    .number({ invalid_type_error: "Preço inválido!" })
    .positive("Preço inválido!"),
  categoria: z
    .string({ required_error: "Preencha a categoria!" })
    .min(3, "Categoria muito curta!")
    .max(100, "Categoria muito longa!"),
  foto: z.any(),
  habilitado: z.any(),
  campos: z.array(
    z
      .object({
        tipoCampo: z.string(),
        nome: z
          .string({ required_error: "Nome muito curto!" })
          .min(3, "Nome muito curto!")
          .max(100, "Nome muito longo!"),
        qtMinOpcoes: z.coerce
          .number({ invalid_type_error: "Valor inválido!" })
          .int("Valor inválido!")
          .positive("Valor inválido!")
          .nullish(),
        qtMaxOpcoes: z.coerce
          .number({ invalid_type_error: "Valor inválido!" })
          .int("Valor inválido!")
          .positive("Valor inválido!")
          .nullish(),
        opcoes: z.array(z.string().max(100, "Opção muito longa!")).nullish(),
        obrigatorio: z.string(),
      })
      .superRefine((campo, ctx) => {
        if (campo.tipoCampo === "input") {
          return;
        }

        if (!campo.opcoes?.length) {
          ctx.addIssue({
            path: ["opcoes"],
            message: "Precisa adicionar opções!",
            code: z.ZodIssueCode.custom,
          });
        }

        if (
          campo.tipoCampo === "multiselect" &&
          typeof campo.qtMinOpcoes === "number" &&
          typeof campo.qtMaxOpcoes === "number"
        ) {
          if (campo.qtMinOpcoes > campo.qtMaxOpcoes) {
            ctx.addIssue({
              path: ["qtMinOpcoes"],
              message: "Valores inválidos!",
              code: z.ZodIssueCode.custom,
            });
            ctx.addIssue({
              path: ["qtMaxOpcoes"],
              message: "Valores inválidos!",
              code: z.ZodIssueCode.custom,
            });
          }
        }
      })
  ),
});
