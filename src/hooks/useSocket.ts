import { useContext } from "react";
import { SocketContext } from "../contexts/Socket";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("Must be used with SocketProvider!");
  }

  return socket;
};
