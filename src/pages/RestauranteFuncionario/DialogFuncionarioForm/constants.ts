import { z } from "zod";
import { Cargo } from "../../../services/api/dtos/create-funcionario.dto";
import { getUsuarioByEmailQuery } from "../../../services/api/usuarios";
import { funcionarioQuery } from "../../../services/api/funcionario";

export const schema = (restauranteId: number, type: "create" | "edit") =>
  z.object({
    cargo: z.nativeEnum(Cargo, { required_error: "Selecione o cargo!" }),
    email: z
      .string({ required_error: "Preencha o email!" })
      .email("Email inválido!")
      .superRefine(async (email, ctx) => {
        if (type === "edit") {
          return;
        }

        if (email) {
          const usuario = await getUsuarioByEmailQuery.params(email).fetch();

          if (!usuario) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Usuário não encontrado!",
              path: [],
            });

            return;
          }

          const funcionario = await funcionarioQuery
            .params(restauranteId, usuario.id)
            .fetch();

          if (funcionario[0]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Funcionário já criado!",
              path: [],
            });
          }
        }
      }),
  });
