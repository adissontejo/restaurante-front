import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { BoxImage, BoxTitle, ButtonsWrapper } from "./styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { theme } from "../../../styles/theme";
import { CategoriaResponseDTO } from "../../../services/api/dtos/categoria-response.dto";
import { Controller, useForm } from "react-hook-form";
import { ControlledFormField } from "../../../components/Form";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { toast } from "react-toastify";
import { TipoCampo } from "../../../services/api/dtos/create-campo-formulario.dto";
import { CampoFormularioResponseDTO } from "../../../services/api/dtos/campo-formluario-response.dto";

interface DialogAddItemProps {
  item: CategoriaResponseDTO["itens"][number];
  handleClose: () => void;
}

interface FormData {
  quantidade: number;
  observacao: string;
  respostas: {
    opcoesIds: number[];
    resposta: string;
  }[];
}

export const DialogAddItem: React.FC<DialogAddItemProps> = ({
  item,
  handleClose,
}) => {
  const { addCartItem } = useRestaurante();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      quantidade: 1,
      respostas: item.campos.map(() => ({
        opcoesIds: [],
      })),
    },
    resolver: zodResolver(schema(item)),
    mode: "onTouched",
  });

  // falta implementar acompanahmentos

  const handleAdd = (data: FormData) => {
    addCartItem({
      ...item,
      observacao: data.observacao,
      quantidade: data.quantidade,
      respostas: data.respostas?.map((resposta, index) => ({
        campoFormularioId: item.campos[index].id,
        opcoesIds: resposta.opcoesIds,
        resposta: resposta.resposta,
      })),
    });
    toast.success("Item adicionado ao carrinho!");
    handleClose();
  };

  const formatNome = (campo: CampoFormularioResponseDTO) => {
    if (campo.tipoCampo !== TipoCampo.MULTISELECT) {
      return campo.nome;
    }

    const qtMinOpcoes = Math.max(
      campo.qtMinOpcoes || 0,
      campo.obrigatorio ? 1 : 0
    );

    if (qtMinOpcoes && campo.qtMaxOpcoes) {
      if (qtMinOpcoes === campo.qtMaxOpcoes) {
        return `${campo.nome} (escolha ${qtMinOpcoes})`;
      }

      return `${campo.nome} (de ${qtMinOpcoes} à ${campo.qtMaxOpcoes})`;
    }

    if (qtMinOpcoes) {
      return `${campo.nome} (${qtMinOpcoes} ou mais)`;
    }

    if (campo.qtMaxOpcoes) {
      return `${campo.nome} (até ${campo.qtMaxOpcoes})`;
    }

    return campo.nome;
  };

  return (
    <>
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          style={{ color: theme.colors.black[600], fontWeight: 600 }}
        >
          {" "}
          Adicionar Item{" "}
        </Typography>
        <CrossSmall onClick={handleClose} />
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <BoxImage>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={item.fotoUrl || ""}
              alt={item.nome}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
          </Box>
          <BoxTitle
            style={{ background: theme.colors.brown[400], padding: "8px 24px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {" "}
              {item.nome}
            </Typography>
            <Typography variant="body1">
              {" "}
              + R$ {item.instanciaAtiva.preco}
            </Typography>
          </BoxTitle>
        </BoxImage>
        <ControlledFormField
          control={control}
          name="quantidade"
          label="Quantidade"
          type="number"
          required
          fullWidth
          sx={{ marginY: 1 }}
        />
        <ControlledFormField
          control={control}
          name="observacao"
          label="Alguma Observação?"
          fullWidth
          sx={{ marginY: 1 }}
        />
        {item.campos?.map((campo, index) =>
          campo.tipoCampo === TipoCampo.INPUT ? (
            <ControlledFormField
              control={control}
              name={`respostas.${index}.resposta`}
              label={campo.nome}
              fullWidth
              sx={{ marginY: 1 }}
              required={campo.obrigatorio}
            />
          ) : (
            <Controller
              control={control}
              name={`respostas.${index}.opcoesIds`}
              render={({ field, fieldState }) => (
                <Autocomplete
                  fullWidth
                  freeSolo
                  multiple={campo.tipoCampo === TipoCampo.MULTISELECT}
                  options={campo.opcoes?.map((opcao) => opcao.id) || []}
                  getOptionLabel={(value) =>
                    campo.opcoes?.find((opcao) => opcao.id === value)?.texto ||
                    ""
                  }
                  sx={{ marginY: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={formatNome(campo)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                  {...field}
                  value={
                    campo.tipoCampo === TipoCampo.MULTISELECT
                      ? field.value
                      : field.value[0]
                  }
                  onChange={(_, value) => {
                    if (campo.tipoCampo === TipoCampo.MULTISELECT) {
                      field.onChange(value);
                    } else {
                      field.onChange(value ? [value] : []);
                    }
                  }}
                ></Autocomplete>
              )}
            />
          )
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
            onClick={handleSubmit(handleAdd)}
          >
            <Typography variant="button">Adicionar</Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </>
  );
};
