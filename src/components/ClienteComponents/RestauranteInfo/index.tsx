import { TitleWithUnderline } from "../../TitleWithUnderline";
import { HorariosFuncionamento } from "./HorariosFuncionamentoCards";
import { RestauranteCard } from "./RestauranteCard";
import type { Restaurante } from "../../../data";
import { formatarEndereco, truncateDescription } from "../../../utils";


interface RestauranteInfoProps {
    restaurante: Restaurante;
  }

export const RestauranteInfo: React.FC<RestauranteInfoProps> = ({ restaurante }) => {
  const enderecoFormatado = formatarEndereco(restaurante.rua, restaurante.numero, restaurante.complemento, restaurante.cep, restaurante.bairro, restaurante.cidade, restaurante.estado)

  return (
      <>
        <TitleWithUnderline text={restaurante.nome} />
        <RestauranteCard
                        imagemUrl={restaurante.logoUrl ? restaurante.logoUrl : ''}
                        descricao={truncateDescription(restaurante.descricao, 660)}
                        localizacao={enderecoFormatado}
                    />
        <HorariosFuncionamento horarios={restaurante.horarios} />
      </>
  );
};
