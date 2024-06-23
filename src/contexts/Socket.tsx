import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useRestaurante } from "../hooks/useRestaurante";
import { useAuth } from "../hooks/useAuth";
import { createPedidosSocket } from "../services/socket";
import { CreatePedidoDTO } from "../services/api/dtos/create-pedido.dto";
import { PedidoResponseDTO } from "../services/api/dtos/pedido-response.dto";

export interface SocketContextData {
  createPedido: (pedido: CreatePedidoDTO) => Promise<PedidoResponseDTO>;
  pedidos: PedidoResponseDTO[];
}

export const SocketContext = createContext<SocketContextData | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { restaurante } = useRestaurante();
  const { usuario } = useAuth();

  const [pedidos, setPedidos] = useState<PedidoResponseDTO[]>([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const unloggedIds: number[] = JSON.parse(
      localStorage.getItem("unloggedIds") || "[]"
    );

    setSocket(createPedidosSocket(restaurante.id, "cliente", unloggedIds));
  }, [restaurante, usuario]);

  socket?.once("connection_response", (data) => {
    setPedidos(data.pedidos);
  });

  const createPedido = (pedido: CreatePedidoDTO) => {
    return new Promise<PedidoResponseDTO>((resolve) => {
      const unloggedIds: number[] = JSON.parse(
        localStorage.getItem("unloggedIds") || "[]"
      );

      socket?.emit("create", pedido);

      socket?.once("create_response", (data: PedidoResponseDTO) => {
        setPedidos((prev) => [...prev, data]);
        resolve(data);
        if (!usuario) {
          unloggedIds.push(data.id);
        }
        localStorage.setItem("unloggedIds", JSON.stringify(unloggedIds));
      });
    });
  };

  return (
    <SocketContext.Provider value={{ createPedido, pedidos }}>
      {children}
    </SocketContext.Provider>
  );
};
