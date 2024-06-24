import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { ButtonsWrapper } from "../../Home/styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import Cancel from "../../../assets/cancel.svg?react";
import { theme } from "../../../styles/theme";
import { useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { Cargo } from "../../../services/api/dtos/create-funcionario.dto";
import { cargos } from "../../../constants";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { getUsuarioByEmailQuery } from "../../../services/api/usuarios";
import {
  createFuncionarioMutation,
  deleteFuncionarioMutation,
  updateFuncionarioMutation,
} from "../../../services/api/funcionario";
import { toast } from "react-toastify";
import { FuncionarioResponseDTO } from "../../../services/api/dtos/funcionario-response.dto";
import { EraseButton, EraseLabel } from "./styles";

interface DialogFuncionarioFormProps {
  handleClose: () => void;
  funcionario?: FuncionarioResponseDTO;
}

interface FormData {
  cargo: Cargo;
  email: string;
}

export const DialogFuncionarioForm: React.FC<DialogFuncionarioFormProps> = ({
  handleClose,
  funcionario,
}) => {
  const { restaurante } = useRestaurante();

  const createFuncionario = createFuncionarioMutation.use();
  const updateFuncionario = updateFuncionarioMutation.use();
  const deleteFuncionario = deleteFuncionarioMutation.use();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      cargo: funcionario?.cargo as any,
      email: funcionario?.usuario.email,
    },
    resolver: zodResolver(
      schema(restaurante.id, funcionario ? "edit" : "create")
    ),
    mode: "onTouched",
  });

  const email = watch("email");

  const { data: usuario } = getUsuarioByEmailQuery.params(email).use();

  const onSubmit = (data: FormData) => {
    if (!funcionario) {
      createFuncionario.mutate(
        {
          cargo: data.cargo,
          restauranteId: restaurante.id,
          usuarioId: usuario?.id as number,
        },
        {
          onSuccess() {
            toast.success("Funcionário criado com sucesso!");
            handleClose();
          },
          onError() {
            toast.error("Erro ao criar funcionário");
          },
        }
      );
    } else {
      updateFuncionario.mutate(
        {
          id: funcionario.id,
          funcionario: {
            cargo: data.cargo,
          },
        },
        {
          onSuccess() {
            toast.success("Funcionário atualizado com sucesso!");
            handleClose();
          },
          onError() {
            toast.error("Erro ao atualizar funcionário");
          },
        }
      );
    }
  };

  const onDelete = () => {
    deleteFuncionario.mutate(funcionario?.id || 0, {
      onSuccess() {
        toast.success("Funcionário excluído!");
        handleClose();
      },
      onError() {
        toast.error("Erro ao excluír funcionário");
      },
    });
  };

  return (
    <>
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          style={{ color: theme.colors.black[600], fontWeight: 600 }}
        >
          Criar Funcionário
        </Typography>
        <CrossSmall onClick={handleClose} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {funcionario && (
          <Card sx={{ marginY: 1 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    src={funcionario?.usuario.fotoPerfilUrl || undefined}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Stack spacing={0}>
                    <Typography
                      variant="h6"
                      style={{
                        color: theme.colors.black[500],
                        fontWeight: 800,
                      }}
                    >
                      {funcionario?.usuario.nome}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        color: theme.colors.black[300],
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {
                        cargos.find((item) => item.value === funcionario?.cargo)
                          ?.label
                      }
                    </Typography>
                  </Stack>
                </Stack>
                <EraseButton onClick={() => setDeleteOpen(true)}>
                  <Cancel />
                  <EraseLabel>Excluir</EraseLabel>
                </EraseButton>
              </Box>
            </CardContent>
          </Card>
        )}
        <ControlledFormField
          control={control}
          name="cargo"
          label="Cargo"
          select
          required
          fullWidth
          sx={{ marginY: 1 }}
          options={cargos.filter((cargo) => cargo.value !== Cargo.DONO)}
        />
        {!funcionario && (
          <ControlledFormField
            control={control}
            name="email"
            label="Email do usuário"
            required
            fullWidth
            sx={{ marginY: 1 }}
          />
        )}
        <ButtonsWrapper>
          <Button
            variant="contained"
            style={{ background: theme.colors.white[500], minWidth: "200px" }}
            onClick={handleClose}
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
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="button">
              {funcionario ? "Salvar" : "Criar"}
            </Typography>
          </Button>
        </ButtonsWrapper>
        <Dialog open={deleteOpen}>
          <DialogTitle
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              variant="body1"
              style={{ color: theme.colors.black[600], fontWeight: 600 }}
            >
              Excluir Funcionário
            </Typography>
            <CrossSmall onClick={() => setDeleteOpen(false)} />
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <Typography
              variant="body1"
              style={{ color: theme.colors.black[500], fontWeight: 700 }}
            >
              Tem certeza que deseja excluir este funcionário do sistema?
            </Typography>
            <ButtonsWrapper>
              <Button
                variant="contained"
                style={{
                  background: theme.colors.white[500],
                  minWidth: "200px",
                }}
                onClick={() => setDeleteOpen(false)}
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
                style={{
                  background: theme.colors.red[400],
                  minWidth: "200px",
                }}
                onClick={onDelete}
              >
                <Typography variant="button">Excluir</Typography>
              </Button>
            </ButtonsWrapper>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </>
  );
};
