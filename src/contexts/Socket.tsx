import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useRestaurante } from "../hooks/useRestaurante";
import { useAuth } from "../hooks/useAuth";
import { createPedidosSocket } from "../services/socket";
import { CreatePedidoDTO } from "../services/api/dtos/create-pedido.dto";
import { PedidoResponseDTO } from "../services/api/dtos/pedido-response.dto";
import { StatusItemPedido } from "../services/api/dtos/item-pedido-response.dto";
import { toast } from "react-toastify";
import { FuncionarioResponseDTO } from "../services/api/dtos/funcionario-response.dto";
import { getCupomsQuery } from "../services/api/cupons";

export interface SocketContextData {
  createPedido: (pedido: CreatePedidoDTO) => Promise<PedidoResponseDTO>;
  startPedido: (id: number) => Promise<void>;
  cancelItem: (id: number) => Promise<void>;
  finishItem: (id: number) => Promise<void>;
  setFuncionarioResponsavel: (
    pedidoId: number,
    funcionarioResponsavelId: number
  ) => Promise<FuncionarioResponseDTO>;
  pedidos: PedidoResponseDTO[];
}

export const SocketContext = createContext<SocketContextData | null>(null);

export const SocketProvider = ({
  children,
  admin,
}: {
  children: ReactNode;
  admin?: boolean;
}) => {
  const { restaurante, funcionarioLogado } = useRestaurante();
  const { usuario } = useAuth();

  const [pedidos, setPedidos] = useState<PedidoResponseDTO[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const emitAsync = <T extends any[]>(event: string, ...params: any[]) => {
    return new Promise<T>((resolve, reject) => {
      const responseListener = (...data: T) => {
        socket?.off(`${event}_error`, errorListener);

        resolve(data);
      };

      const errorListener = (...data: T) => {
        socket?.off(`${event}_response`, responseListener);

        reject(data);
      };

      socket?.once(`${event}_response`, responseListener);
      socket?.once(`${event}_error`, errorListener);
      socket?.emit(event, ...params);
    });
  };

  useEffect(() => {
    setSocket(
      createPedidosSocket(restaurante.id, admin ? "funcionario" : "cliente")
    );
  }, [restaurante, usuario, admin]);

  socket?.once("connection_response", (data) => {
    setPedidos(data.pedidos);
  });

  const pedidoCreated = (pedido: PedidoResponseDTO) => {
    setPedidos((prev) => [pedido, ...prev]);
  };

  const pedidoStarted = (id: number) => {
    setPedidos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, iniciado: true } : item))
    );
  };

  const itemCanceled = (id: number) => {
    setPedidos((prev) =>
      prev.map((pedido) => ({
        ...pedido,
        itens: pedido.itens.map((item) =>
          item.id === id
            ? { ...item, status: StatusItemPedido.CANCELADO }
            : item
        ),
      }))
    );
  };

  const itemFinished = (id: number) => {
    setPedidos((prev) =>
      prev.map((pedido) => ({
        ...pedido,
        itens: pedido.itens.map((item) =>
          item.id === id
            ? { ...item, status: StatusItemPedido.FINALIZADO }
            : item
        ),
      }))
    );
  };

  const funcionarioResponsavelChanged = (
    pedidoId: number,
    funcionarioResponsavel: FuncionarioResponseDTO
  ) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === pedidoId ? { ...pedido, funcionarioResponsavel } : pedido
      )
    );
  };

  const createPedido = async (pedido: CreatePedidoDTO) => {
    const unloggedIds: number[] = JSON.parse(
      localStorage.getItem("unloggedIds") || "[]"
    );

    const [response] = await emitAsync<[PedidoResponseDTO]>("create", pedido);

    getCupomsQuery.params(usuario?.id || 0, restaurante.id).invalidate();

    if (!usuario) {
      unloggedIds.push(response.id);

      localStorage.setItem("unloggedIds", JSON.stringify(unloggedIds));
    }

    pedidoCreated(response);

    return response;
  };

  const startPedido = async (id: number) => {
    await emitAsync("start", id);

    pedidoStarted(id);
  };

  const cancelItem = async (id: number) => {
    await emitAsync("cancel-item", id);

    itemCanceled(id);
  };

  const finishItem = async (id: number) => {
    await emitAsync("finish-item", id);

    itemFinished(id);
  };

  const setFuncionarioResponsavel = async (
    pedidoId: number,
    funcionarioResponsavelId: number
  ) => {
    const [data] = await emitAsync<[FuncionarioResponseDTO]>(
      "set-funcionario-responsavel",
      pedidoId,
      funcionarioResponsavelId
    );

    funcionarioResponsavelChanged(pedidoId, data);

    return data;
  };

  useEffect(() => {
    socket?.on("created", (data: PedidoResponseDTO) => {
      toast.info("Um novo pedido foi criado!");
      pedidoCreated(data);
    });

    socket?.on("started", (id: number) => {
      if (!admin) {
        toast.info("O seu pedido foi iniciado!");
      }
      pedidoStarted(id);
    });

    socket?.on("item-canceled", (id: number) => {
      if (!admin) {
        toast.error("Um dos itens do seu pedido foi cancelado!");
      }
      itemCanceled(id);
    });

    socket?.on("item-finished", (id: number) => {
      if (!admin) {
        toast.success("Um item do seu pedido está pronto!");
      }
      itemFinished(id);
    });

    socket?.on(
      "funcionario-responsavel-changed",
      (pedidoId: number, funcionarioResponsavel: FuncionarioResponseDTO) => {
        const pedido = pedidos.find((item) => item.id === pedidoId);

        if (
          pedido?.funcionarioResponsavel?.id === funcionarioLogado?.id &&
          funcionarioResponsavel.id !== funcionarioLogado?.id &&
          admin
        ) {
          toast.info(
            "Um dos seus pedidos foi removido da sua responsabilidade!"
          );
        } else if (
          funcionarioResponsavel.id === funcionarioLogado?.id &&
          admin
        ) {
          toast.info("Um novo pedido foi colocado sob sua responsabilidade!");
        }

        funcionarioResponsavelChanged(pedidoId, funcionarioResponsavel);
      }
    );

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        createPedido,
        startPedido,
        pedidos,
        cancelItem,
        finishItem,
        setFuncionarioResponsavel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
