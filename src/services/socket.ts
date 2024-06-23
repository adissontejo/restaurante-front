import { io } from "socket.io-client";

export const createPedidosSocket = (
  restauranteId: number,
  connectionType: "cliente" | "funcionario"
) => {
  return io(`${import.meta.env.VITE_API_URL}/pedidos`, {
    query: {
      restauranteId,
      connectionType,
      unloggedIds: JSON.parse(localStorage.getItem("unloggedIds") || "[]"),
    },
    auth: {
      token: localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : undefined,
    },
  });
};
