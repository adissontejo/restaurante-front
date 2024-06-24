import { FC } from "react";
import { Card, Avatar, Info, Name, Role, EditButton } from "./styles";

export interface FuncionarioCardProps {
  funcionario: {
    id: number;
    nome: string;
    cargo: string;
    avatarUrl: string | null;
  };
}

export const FuncionarioCard: FC<FuncionarioCardProps> = ({ funcionario }) => {
  return (
    <Card>
      <Avatar src={funcionario.avatarUrl || "/default-avatar.png"} alt={funcionario.nome} />
      <Info>
        <Name>{funcionario.nome}</Name>
        <Role>{funcionario.cargo}</Role>
      </Info>
      <EditButton>EDITAR</EditButton>
    </Card>
  );
};
