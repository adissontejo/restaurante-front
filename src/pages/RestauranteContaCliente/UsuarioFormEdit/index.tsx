import { useEffect } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import SignOutAlt from "../../../assets/sign-out-alt.svg?react";
import { BoxHeader, ButtonsWrapper, VerticalLine } from "./styles";
import { theme } from "../../../styles/theme";
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { Navigate, useParams } from "react-router-dom";
import { ControlledUploadImage } from "../../../components/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { updateUsuarioMutation } from "../../../services/api/usuarios";

interface FormData {
  nome: string;
  email: string;
  fotoPerfil: File;
}

export const UsuarioFormEdit = () => {
  const { usuario } = useAuth();

  const { control, reset, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const { dominio } = useParams();

  const updateUsuario = updateUsuarioMutation.use();

  useEffect(() => {
    reset(usuario);
  }, [usuario]);

  const handleSave = async (data: FormData) => {
    if (!usuario) {
      return;
    }

    updateUsuario.mutate({
      id: usuario.id,
      usuario: {
        ...data,
        fotoPerfil: data.fotoPerfil || undefined,
      },
    });
  };

  const handleCancel = () => {
    reset(usuario);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  if (!usuario) {
    return <Navigate to={`/restaurante/${dominio}`} />;
  }

  return (
    <Container
      maxWidth="lg"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <BoxHeader>
        <Box
          position="relative"
          sx={{
            boxShadow: "0 4px 50px rgba(0, 0, 0, 0.25)",
            borderRadius: "50%",
          }}
        >
          <ControlledUploadImage
            control={control}
            name="fotoPerfil"
            placeholderUrl={usuario.fotoPerfilUrl || undefined}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{ color: theme.colors.black[600], fontWeight: 700 }}
        >
          {usuario?.nome}
        </Typography>
        <VerticalLine />
        <Button
          onClick={handleLogout}
          sx={{ textTransform: "none", display: "flex", gap: "12px" }}
        >
          <SignOutAlt />
          <Typography
            variant="h6"
            sx={{ color: theme.colors.red[400], fontWeight: 700 }}
          >
            Sair
          </Typography>
        </Button>
      </BoxHeader>
      <Grid component="form" container spacing={8}>
        <Grid item xs={16} sm={8} md={4}>
          {" "}
          <ControlledFormField
            control={control}
            name="nome"
            label="Nome"
            fullWidth
          />{" "}
        </Grid>
        <Grid item xs={16} sm={6} md={8}>
          {" "}
          <ControlledFormField
            control={control}
            name="email"
            label="Email"
            fullWidth
            disabled
          />
        </Grid>
        {/*
          <Grid item xs={16} sm={6} md={6}>
          <TextField
            name="dataNascimento"
            label="Data de Nascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={16} sm={6} md={6}>
          <TextField
            name="celular"
            label="Celular"
            value={formData.celular || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        */}
      </Grid>
      <ButtonsWrapper>
        <Button
          variant="contained"
          style={{ background: theme.colors.white[500], minWidth: "200px" }}
          onClick={handleCancel}
        >
          <Typography
            variant="button"
            style={{ color: theme.colors.black[600] }}
          >
            Cancelar
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={{ background: theme.colors.black[600], minWidth: "200px" }}
          onClick={handleSubmit(handleSave)}
        >
          <Typography variant="button">Salvar</Typography>
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};
