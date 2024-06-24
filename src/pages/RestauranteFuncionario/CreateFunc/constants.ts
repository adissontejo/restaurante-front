import { z } from "zod";
import { Cargo } from "../../../services/api/dtos/create-funcionario.dto";

export const schema = z.object({
  cargo: z.nativeEnum(Cargo, { required_error: "Cargo é obrigatório" }),
  usuarioId: z.coerce
    .number({ invalid_type_error: "ID do usuário inválido" })
    .int("ID do usuário deve ser um número inteiro")
    .positive("ID do usuário deve ser um número positivo"),
  restauranteId: z.coerce
    .number({ invalid_type_error: "ID do restaurante inválido" })
    .int("ID do restaurante deve ser um número inteiro")
    .positive("ID do restaurante deve ser um número positivo"),
});
