import { z } from "zod";
import { ItemResponseDTO } from "../../../services/api/dtos/item-response.dto";
import { TipoCampo } from "../../../services/api/dtos/create-campo-formulario.dto";

export const schema = (item: ItemResponseDTO) =>
  z.object({
    quantidade: z.coerce
      .number({ invalid_type_error: "Número inválido!" })
      .positive("Número inválido!")
      .int("Número inválido!"),
    observacao: z.string().max(400, "Observação muito grande!").optional(),
    respostas: z.tuple(
      item.campos.map((campo) => {
        if (campo.tipoCampo === TipoCampo.INPUT) {
          let resposta = z
            .string({ required_error: "Resposta obrigatória!" })
            .max(400, "Resposta muito longa!");

          if (!campo.obrigatorio) {
            resposta = resposta.optional() as any;
          }

          return z.object({ resposta });
        } else if (campo.tipoCampo === TipoCampo.SELECT) {
          let opcoesIds = z.array(z.number());

          if (campo.obrigatorio) {
            opcoesIds = opcoesIds.nonempty("Selecione uma opção!") as any;
          }

          return z.object({ opcoesIds });
        } else {
          let opcoesIds = z.array(z.number());

          if (campo.qtMinOpcoes || campo.obrigatorio) {
            opcoesIds = opcoesIds.min(
              campo.qtMinOpcoes || 1,
              `Mínimo de ${campo.qtMinOpcoes || 1} opção(ões)`
            );
          }

          if (campo.qtMaxOpcoes) {
            opcoesIds = opcoesIds.max(
              campo.qtMaxOpcoes,
              `Máximo de ${campo.qtMaxOpcoes} opção(ões)`
            );
          }

          return z.object({ opcoesIds });
        }
      }) as any
    ),
  });
