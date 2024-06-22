import { ReactNode, createContext, useEffect, useState } from "react";
import { ItemPedido, itemPedidos } from "../data";
import { useParams } from "react-router-dom";
import { restauranteByDominioQuery } from "../services/api/restaurantes";
import { RestauranteDTO } from "../services/api/dtos/restaurante";

export interface RestauranteContextData {
  restaurante: RestauranteDTO;
  itensCarrinho: ItemPedido[];
  handleAlterCart: (itens: ItemPedido[]) => void;
}

export const RestauranteContext = createContext<RestauranteContextData | null>(
  null
);

export const RestauranteProvider = ({ children }: { children: ReactNode }) => {
  const { dominio } = useParams();

  const { data: restaurante } = restauranteByDominioQuery.params(dominio).use();

  const [itensCarrinho, setItensCarrinho] = useState<ItemPedido[]>([]);

  useEffect(() => {
    setItensCarrinho([itemPedidos[0], itemPedidos[1], itemPedidos[2]]);
  }, []);

  const handleAlterCart = (itens: ItemPedido[]) => {
    setItensCarrinho(itens);
  };

  if (!restaurante) {
    return null;
  }

  return (
    <RestauranteContext.Provider
      value={{ restaurante, itensCarrinho, handleAlterCart }}
    >
      {children}
    </RestauranteContext.Provider>
  );
};
