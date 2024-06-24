import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { funcionarioQuery } from "../../services/api/funcionario";
import { FuncionarioCard } from "../FuncionarioCard";
import { BoxList } from "./styles";
import { FuncionarioResponseDTO } from "../../services/api/dtos/funcionario-response.dto";

export interface FuncionarioListProps {
  restauranteId: number;
  usuarioId?: number;
  roleFilter?: string | "todos";
}

export const FuncionarioList = ({
  restauranteId,
  usuarioId,
  roleFilter = "todos",
}: FuncionarioListProps) => {
  const { data: funcionarios = [], isLoading, error } = useQuery<FuncionarioResponseDTO[]>(
    funcionarioQuery(restauranteId, usuarioId)
  );

  const funcionariosFiltered = useMemo(() => {
    if (roleFilter === "todos") {
      return funcionarios;
    } else {
      return funcionarios.filter((funcionario) => funcionario.cargo === roleFilter);
    }
  }, [roleFilter, funcionarios]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading funcionarios</div>;

  return (
    <BoxList>
      {funcionariosFiltered.map((funcionario) => (
        <FuncionarioCard 
          key={funcionario.id} 
          funcionario={{
            id: funcionario.id,
            nome: funcionario.usuario.nome,
            cargo: funcionario.cargo,
            avatarUrl: funcionario.usuario.fotoPerfilUrl,
          }} 
        />
      ))}
    </BoxList>
  );
};
