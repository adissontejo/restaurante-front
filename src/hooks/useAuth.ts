import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

export const useAuth = () => {
  const data = useContext(AuthContext);

  if (!data) {
    throw new Error("Must be used with AuthProvider");
  }

  return data;
};
