import { useGoogleLogin } from "@react-oauth/google";
import { ReactNode, createContext } from "react";
import { loginMutation } from "../services/api/auth";
import { usuarioLogadoQuery } from "../services/api/usuarios";

export interface AuthContextData {
  usuario: any;
  login: () => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: usuario, refetch } = usuarioLogadoQuery.use();

  const login = loginMutation
    .options({
      onSuccess(data) {
        localStorage.setItem("token", data.accessToken);
        refetch();
      },
    })
    .use();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => login.mutate(code),
  });

  return (
    <AuthContext.Provider value={{ usuario, login: googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
