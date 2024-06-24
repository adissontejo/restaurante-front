import { format } from "date-fns";
import { PedidoResponseDTO } from "./services/api/dtos/pedido-response.dto";
import { ItemResponseDTO } from "./services/api/dtos/item-response.dto";

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const getCategorias = (itens: ItemResponseDTO[]): string[] => {
  return Array.from(
    itens.reduce((acc, curr) => {
      acc.add(curr.categoria);

      return acc;
    }, new Set<string>())
  );
};

export const formatTime = (date: Date) => {
  return format(date, "HH:mm:ss");
};

export const calculaTotalPedido = (pedido: PedidoResponseDTO) => {
  let valorTotal = 0;
  pedido.itens.forEach((item) => {
    const subtotal = item.instanciaItem.preco * item.quantidade;
    valorTotal += subtotal;
  });
  if (pedido.cupom) {
    valorTotal = Math.max(valorTotal - pedido.cupom.desconto, 0);
  }
  return valorTotal;
};

export const formatarEndereco = (
  rua: string,
  numero: number,
  complemento: string | null,
  cep: string,
  bairro: string,
  cidade: string,
  estado: string
): string => {
  let enderecoFormatado = `${rua}, ${numero}`;

  if (complemento) {
    enderecoFormatado += `, ${complemento}`;
  }

  enderecoFormatado += `, ${bairro}, ${cep}, ${cidade} - ${estado}`;

  return enderecoFormatado;
};

export const truncateDescription = (
  description: string,
  maxLength: number
): string => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength - 3) + "...";
  }
  return description;
};

export const groupArray = <T, R = T[]>(
  data: T[],
  {
    by,
    format = (group) => group as R,
  }: { by: (item: T) => any; format?: (group: T[]) => R }
) => {
  const map = new Map<any, T[]>();

  data.forEach((item) => {
    const key = by(item);
    let group = map.get(key);
    if (!group) {
      group = [];
    }
    group.push(item);
    map.set(key, group);
  });

  const groups = Array.from(map.values());

  return groups.map(format);
};
