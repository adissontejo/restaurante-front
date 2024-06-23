import { useContext } from "react";
import { RestauranteContext } from "../contexts/Restaurante";

export const useRestaurante = () => {
  const data = useContext(RestauranteContext);

  if (!data) {
    throw new Error("Must be used with RestauranteProvider!");
  }

  return data;
};
