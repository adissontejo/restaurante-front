import { z } from "zod";
import { restauranteByDominioQuery } from "../../services/api/restaurantes";
import { cepQuery } from "../../services/viacep";

export const sections = [
  {
    key: "exhibition",
    label: "Informações de Exibição",
  },
  {
    key: "address",
    label: "Endereço",
  },
  {
    key: "schedules",
    label: "Horários",
  },
  {
    key: "coupons",
    label: "Cupons",
  },
] as const;

export const exhibitionFormSchema = z
  .object({
    nome: z.string().min(3, "Nome muito curto!").max(100, "Nome muito longo!"),
    dominio: z
      .string()
      .min(3, "Domínio muito curto!")
      .max(20, "Domínio muito longo!")
      .regex(
        /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)$/,
        "Domínio no formato incorreto!"
      ),
    descricao: z.string().max(400).optional(),
  })
  .superRefine(async (data, ctx) => {
    if (data.dominio.length >= 3) {
      const restaurante = await restauranteByDominioQuery
        .params(data.dominio)
        .fetch();

      if (restaurante) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Domínio já existe!",
          path: ["dominio"],
        });
      }
    }
  });

export const addressFormSchema = z
  .object({
    cep: z.string().regex(/\d{5}-\d{3}/, "CEP inválido!"),
    bairro: z
      .string()
      .min(3, "Nome do bairro muito curto!")
      .max(100, "Nome do bairro muito longo!"),
    rua: z
      .string()
      .min(3, "Nome da rua muito curto!")
      .max(100, "Nome da rua muito longo!"),
    complemento: z.string().max(100, "Complemento muito longo!").optional(),
    numero: z.coerce
      .number({ invalid_type_error: "Número inválido!" })
      .positive("Número inválido!")
      .int("Número inválido!"),
  })
  .superRefine(async (data, ctx) => {
    if (data.cep.replace(/\D/g, "").length === 8) {
      const result = await cepQuery.params(data.cep).fetch();
      if (!result) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CEP não encontrado!",
          path: ["cep"],
        });
      }
    }
  });

export const couponsFormSchema = z
  .object({
    enabled: z.union([z.literal("yes"), z.literal("no")]),
    valorFidelidade: z.coerce
      .number({ invalid_type_error: "Valor inválido!" })
      .positive("Valor inválido!")
      .optional()
      .or(z.string().length(0)),
    qtPedidosFidelidade: z.coerce
      .number({ invalid_type_error: "Número inválido!" })
      .positive("Número inválido!")
      .int("Número inválido!")
      .optional()
      .or(z.string().length(0)),
  })
  .superRefine((data, ctx) => {
    if (data.enabled === "yes" && !data.qtPedidosFidelidade) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valor deve ser preenchido!",
        path: ["qtPedidosFidelidade"],
      });
    }

    if (data.enabled === "yes" && !data.valorFidelidade) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valor deve ser preenchido!",
        path: ["valorFidelidade"],
      });
    }
  });
