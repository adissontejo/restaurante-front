import { useGoogleLogin } from "@react-oauth/google";
import { ReactNode, createContext } from "react";
import { loginMutation } from "../services/api/auth";
import { usuarioLogadoQuery } from "../services/api/usuarios";
import { UsuarioResponseDTO } from "../services/api/dtos/usuario-response.dto";

export interface AuthContextData {
  usuario: UsuarioResponseDTO | undefined;
  login: () => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: usuario,
    isLoading,
    refetch: refetchUsuarioLogado,
  } = usuarioLogadoQuery
    .options({
      retry: false,
    })
    .use();

  const login = loginMutation
    .options({
      onSuccess(data) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        refetchUsuarioLogado();
      },
    })
    .use();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => login.mutate(code),
  });

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ usuario, login: googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
