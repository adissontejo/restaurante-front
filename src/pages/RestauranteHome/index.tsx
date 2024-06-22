import { HorariosFuncionamento } from "./HorariosFuncionamentoCards";
import { RestauranteCard } from "./RestauranteCard";
import { formatarEndereco, truncateDescription } from "../../utils";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { useRestaurante } from "../../hooks/useRestaurante";

export const RestauranteHome = () => {
  const { restaurante } = useRestaurante();

  const enderecoFormatado = formatarEndereco(
    restaurante.rua,
    restaurante.numero,
    restaurante.complemento,
    restaurante.cep,
    restaurante.bairro,
    restaurante.cidade,
    restaurante.estado
  );

  return (
    <>
      <TitleWithUnderline text={restaurante.nome} />
      <RestauranteCard
        imagemUrl={restaurante.logoUrl ? restaurante.logoUrl : ""}
        descricao={truncateDescription(restaurante.descricao || "", 660)}
        localizacao={enderecoFormatado}
      />
      <HorariosFuncionamento horarios={restaurante.horarios} />
    </>
  );
};
