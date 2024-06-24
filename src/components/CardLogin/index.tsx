import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { RestauranteResponseDTO } from "../../services/api/dtos/restaurante-response.dto";
import { LoginButton } from "../LoginButton";
import { ListTab } from "../ListTab";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useRestaurante } from "../../hooks/useRestaurante";

interface CardLoginProps {
  restaurante: RestauranteResponseDTO;
}

export const CardLogin: React.FC<CardLoginProps> = ({ restaurante }) => {
  const { usuario } = useAuth();
  const { restaurante: restauranteContext, funcionarioLogado } = useRestaurante();

  const loginTypes = [{ label: 'Usuário', value: 'user' }, { label: 'Restaurante', value: 'funcionario' }];

  const [loginType, setLoginType] = useState('user');
  const navigate = useNavigate();

  const handleClickLogado = () => {
    if (loginType === 'user') {
      navigate(`/restaurante/${restaurante.dominio}/`);
      toast.success(`Bem Vindo(a) ${usuario ? usuario.nome : ""}`);
    } else {
      if (funcionarioLogado && usuario && restauranteContext.dominio === restaurante.dominio && funcionarioLogado.id === usuario.id) {
        navigate(`/restaurante/${restaurante.dominio}/`);
      } else {
        toast.error("Você não tem permissão de funcionário!");
      }
    }
  };

  const handleChange = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const handleJump = () => {
    if (loginType === 'user') {
      navigate(`/restaurante/${restaurante.dominio}/`);
      toast.success("Logado como Visitante");
    } else {
      toast.error("Apenas usuários logados podem logar como administradores de restaurante!");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ height: "160px", width: "160px", zIndex: 1 }}>
        <CardMedia
          component="img"
          image={restaurante.logoUrl ? restaurante.logoUrl : ""}
          alt={restaurante.nome}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "100px",
            border: "4px solid #fff",
          }}
        />
      </Box>
      <Card
        variant="elevation"
        sx={{
          width: 600,
          padding: "90px 32px 60px 32px",
          marginTop: "-80px",
          borderRadius: "24px",
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}
        >
          <ListTab items={loginTypes} onChange={setLoginType} value={loginType} />
          {!usuario ? (
            <React.Fragment>
              <LoginButton />
              <Button variant="text" onClick={handleJump}>
                <Typography> Pular o login </Typography>
              </Button>
            </React.Fragment>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Button variant="contained" onClick={handleClickLogado}>
                <Typography> Entrar no Restaurante </Typography>
              </Button>
              <Button variant="text" onClick={handleChange}>
                <Typography> Mudar a Conta </Typography>
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
