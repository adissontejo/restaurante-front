import { ReactNode, createContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { restauranteByDominioQuery } from "../services/api/restaurantes";
import { RestauranteResponseDTO } from "../services/api/dtos/restaurante-response.dto";
import { ItemResponseDTO } from "../services/api/dtos/item-response.dto";
import { useAuth } from "../hooks/useAuth";
import { funcionarioQuery } from "../services/api/funcionario";
import { FuncionarioResponseDTO } from "../services/api/dtos/funcionario-response.dto";
import { CreateItemPedidoDTO } from "../services/api/dtos/create-item-pedido.dto";

interface ItemCarrinho extends ItemResponseDTO {
  quantidade: number;
  observacao?: string;
  respostas?: CreateItemPedidoDTO["respostas"];
}

export interface RestauranteContextData {
  restaurante: RestauranteResponseDTO;
  funcionarioLogado?: FuncionarioResponseDTO;
  itensCarrinho: ItemCarrinho[];
  emptyCart: () => void;
  addCartItem: (item: ItemCarrinho) => void;
  removeCartItem: (index: number) => void;
  updateCartItem: (index: number, item: ItemCarrinho) => void;
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
  totalPedido: number;
}

export const RestauranteContext = createContext<RestauranteContextData | null>(
  null
);

export const RestauranteProvider = ({ children }: { children: ReactNode }) => {
  const { dominio } = useParams();

  const { usuario } = useAuth();

  const { data: restaurante } = restauranteByDominioQuery.params(dominio).use();
  const { data: funcionarios, isLoading: isLoadingFuncionario } =
    funcionarioQuery
      .options({ enabled: !!usuario && !!restaurante })
      .params(restaurante?.id || 0, usuario?.id)
      .use();

  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);

  const emptyCart = () => {
    setItensCarrinho([]);
  };

  const addCartItem = (item: ItemCarrinho) => {
    setItensCarrinho((prev) => [...prev, item]);
  };

  const removeCartItem = (index: number) => {
    setItensCarrinho((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartItem = (index: number, item: ItemCarrinho) => {
    setItensCarrinho((prev) => prev.map((it, i) => (i === index ? item : it)));
  };

  const incrementCartItem = (index: number) => {
    setItensCarrinho((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, quantidade: it.quantidade + 1 } : it
      )
    );
  };

  const decrementCartItem = (index: number) => {
    setItensCarrinho((prev) =>
      prev
        .map((it, i) =>
          i === index ? { ...it, quantidade: it.quantidade - 1 } : it
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const totalPedido = useMemo(() => {
    return itensCarrinho.reduce((acc, curr) => {
      return acc + curr.instanciaAtiva.preco * curr.quantidade;
    }, 0);
  }, [itensCarrinho]);

  if (!restaurante || isLoadingFuncionario) {
    return null;
  }

  return (
    <RestauranteContext.Provider
      value={{
        restaurante,
        funcionarioLogado: funcionarios?.[0],
        itensCarrinho,
        emptyCart,
        addCartItem,
        removeCartItem,
        updateCartItem,
        totalPedido,
        incrementCartItem,
        decrementCartItem,
      }}
    >
      {children}
    </RestauranteContext.Provider>
  );
};
