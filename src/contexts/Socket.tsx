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

export interface SocketContextData {
  createPedido: (pedido: CreatePedidoDTO) => Promise<PedidoResponseDTO>;
  startPedido: (id: number) => Promise<void>;
  cancelItem: (id: number) => Promise<void>;
  finishItem: (id: number) => Promise<void>;
  setFuncionarioResponsavel: (
    pedidoId: number,
    funcionarioResponsavelId: number
  ) => Promise<void>;
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

  const createPedido = (pedido: CreatePedidoDTO) => {
    return new Promise<PedidoResponseDTO>((resolve) => {
      const unloggedIds: number[] = JSON.parse(
        localStorage.getItem("unloggedIds") || "[]"
      );

      socket?.emit("create", pedido);

      socket?.once("create_response", (data: PedidoResponseDTO) => {
        pedidoCreated(data);
        resolve(data);
        if (!usuario) {
          unloggedIds.push(data.id);
        }
        localStorage.setItem("unloggedIds", JSON.stringify(unloggedIds));
      });
    });
  };

  const startPedido = (id: number) => {
    return new Promise<void>((resolve) => {
      socket?.emit("start", id);

      socket?.once("start_response", () => {
        pedidoStarted(id);
        resolve();
      });
    });
  };

  const cancelItem = (id: number) => {
    return new Promise<void>((resolve) => {
      socket?.emit("cancel-item", id);

      socket?.once("cancel-item_response", () => {
        itemCanceled(id);
        resolve();
      });
    });
  };

  const finishItem = (id: number) => {
    return new Promise<void>((resolve) => {
      socket?.emit("finish-item", id);

      socket?.once("finish-item_response", () => {
        itemFinished(id);
        resolve();
      });
    });
  };

  const setFuncionarioResponsavel = (
    pedidoId: number,
    funcionarioResponsavelId: number
  ) => {
    return new Promise<void>((resolve) => {
      socket?.emit(
        "set-funcionario-responsavel",
        pedidoId,
        funcionarioResponsavelId
      );

      socket?.once("set-funcionario-responsavel_response", (data) => {
        funcionarioResponsavelChanged(pedidoId, data);
        resolve();
      });
    });
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
