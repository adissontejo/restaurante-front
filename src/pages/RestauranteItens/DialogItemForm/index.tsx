import React, { useMemo } from "react";
import {
  Autocomplete,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonsWrapper } from "./styles";
import CrossSmall from "../../../assets/cross-small.svg?react";
import { theme } from "../../../styles/theme";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ControlledFormField, Form } from "../../../components/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./constants";
import { ItemResponseDTO } from "../../../services/api/dtos/item-response.dto";
import { ControlledUploadImage } from "../../../components/UploadImage";
import { GridItem } from "../../../components/Grid";
import { AddButton } from "../../../components/AddButton";
import { InputCard } from "../../../components/InputCard";
import { Delete } from "@mui/icons-material";
import {
  createItemMutation,
  getItensQuery,
  updateItemMutation,
} from "../../../services/api/itens";
import { TipoCampo } from "../../../services/api/dtos/create-campo-formulario.dto";
import { toast } from "react-toastify";
import { ControlledBooleanRadio } from "../../../components/BooleanRadio";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { getCategorias } from "../../../utils";

interface DialogItemFormProps {
  item?: ItemResponseDTO;
  handleClose: () => void;
}

interface FormData {
  nome: string;
  preco: number;
  habilitado: "yes" | "no";
  foto: File;
  categoria: string;
  campos: {
    obrigatorio: "yes" | "no";
    nome: string;
    tipoCampo: TipoCampo;
    qtMinOpcoes: number;
    qtMaxOpcoes: number;
    opcoes: string[];
  }[];
}

export const DialogItemForm: React.FC<DialogItemFormProps> = ({
  item,
  handleClose,
}) => {
  const { restaurante } = useRestaurante();

  const { data: itens } = getItensQuery.params(restaurante.id).use();

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      nome: item?.nome,
      preco: item?.instanciaAtiva.preco,
      categoria: item?.categoria,
      habilitado: item ? (item.habilitado ? "yes" : "no") : "yes",
      campos: item?.campos.map((campo) => ({
        ...campo,
        obrigatorio: campo.obrigatorio ? "yes" : "no",
        qtMinOpcoes: campo.qtMinOpcoes,
        qtMaxOpcoes: campo.qtMaxOpcoes,
        opcoes: campo.opcoes?.map((opcao) => opcao.texto),
      })),
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const camposFields = useFieldArray({
    name: "campos",
    control,
  });
  const createItem = createItemMutation.use();
  const updateItem = updateItemMutation.use();
  const campos = watch("campos");

  const categorias = useMemo(() => {
    return getCategorias(itens || []);
  }, [itens]);

  const handleAdd = (formData: FormData) => {
    const data = {
      ...formData,
      categoria: formData.categoria,
      restauranteId: restaurante.id,
      habilitado: formData.habilitado === "yes",
      campos: formData.campos?.length
        ? formData.campos.map((campo) => {
            if (campo.tipoCampo === TipoCampo.INPUT) {
              return {
                nome: campo.nome,
                tipoCampo: campo.tipoCampo,
                obrigatorio: campo.obrigatorio === "yes",
                opcoes: null,
                qtMinOpcoes: null,
                qtMaxOpcoes: null,
              };
            } else if (campo.tipoCampo === TipoCampo.SELECT) {
              return {
                nome: campo.nome,
                tipoCampo: campo.tipoCampo,
                obrigatorio: campo.obrigatorio === "yes",
                opcoes: campo.opcoes,
                qtMinOpcoes: null,
                qtMaxOpcoes: null,
              };
            } else {
              return {
                ...campo,
                obrigatorio: campo.obrigatorio === "yes",
              };
            }
          })
        : null,
    };

    if (!item) {
      createItem.mutate(data as any, {
        onSuccess() {
          toast.success("Item criado com sucesso!");
          handleClose();
        },
        onError() {
          toast.error("Erro ao criar item");
        },
      });
    } else {
      updateItem.mutate(
        {
          id: item.id,
          item: data as any,
        },
        {
          onSuccess() {
            toast.success("Item atualizado com sucesso!");
            handleClose();
          },
          onError() {
            toast.error("Erro ao atualizar item");
          },
        }
      );
    }
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
        <Form>
          <GridItem>
            <ControlledUploadImage
              control={control}
              name="foto"
              placeholderUrl={item?.fotoUrl || undefined}
            />
          </GridItem>
          <GridItem>
            <Controller
              control={control}
              name="categoria"
              render={({ field, fieldState }) => (
                <Autocomplete
                  fullWidth
                  freeSolo
                  options={categorias}
                  renderInput={(params) => (
                    <TextField
                      label="Categoria"
                      {...params}
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      required
                    />
                  )}
                ></Autocomplete>
              )}
            />
          </GridItem>
          <ControlledFormField
            control={control}
            name="nome"
            label="Nome"
            required
            fullWidth
            span={8}
            sx={{ marginY: 1 }}
          />
          <ControlledFormField
            control={control}
            name="preco"
            label="Preço"
            type="number"
            fullWidth
            span={4}
            required
            sx={{ marginY: 1 }}
          />
          <GridItem>
            <ControlledBooleanRadio
              control={control}
              name="habilitado"
              onValue="yes"
              offValue="no"
              label="Item habilitado?"
              onLabel="Sim"
              offLabel="Não"
            />
          </GridItem>
        </Form>
        {camposFields.fields.map((_, index) => (
          <InputCard>
            <Form>
              <GridItem>
                <Stack
                  direction="row"
                  spacing={8}
                  justifyContent="space-between"
                >
                  <ControlledBooleanRadio
                    control={control}
                    name={`campos.${index}.obrigatorio`}
                    onValue="yes"
                    offValue="no"
                    label="Campo obrigatório?"
                    onLabel="Sim"
                    offLabel="Não"
                  />
                  <IconButton onClick={() => camposFields.remove(index)}>
                    <Delete />
                  </IconButton>
                </Stack>
              </GridItem>
              <GridItem>
                <FormControl fullWidth sx={{ background: "white" }}>
                  <InputLabel id="tipo-label">Tipo</InputLabel>
                  <Controller
                    control={control}
                    name={`campos.${index}.tipoCampo`}
                    render={({ field }) => (
                      <Select label="tipo-label" {...field} fullWidth required>
                        <MenuItem value="input">Texto</MenuItem>
                        <MenuItem value="select">Select</MenuItem>
                        <MenuItem value="multiselect">MultiSelect</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </GridItem>
              <ControlledFormField
                control={control}
                name={`campos.${index}.nome`}
                label="Nome"
                required
              />
              {campos[index].tipoCampo === "multiselect" && (
                <>
                  <ControlledFormField
                    control={control}
                    name={`campos.${index}.qtMinOpcoes`}
                    label="Quantidade Mínima"
                    type="number"
                    span={6}
                  />
                  <ControlledFormField
                    control={control}
                    name={`campos.${index}.qtMaxOpcoes`}
                    label="Quantidade Máxima"
                    type="number"
                    span={6}
                  />
                </>
              )}
              {campos[index].tipoCampo !== "input" && (
                <GridItem>
                  <Controller
                    control={control}
                    name={`campos.${index}.opcoes`}
                    render={({ field, fieldState }) => (
                      <Autocomplete
                        fullWidth
                        freeSolo
                        multiple
                        options={[]}
                        renderInput={(params) => (
                          <TextField
                            label="Opções"
                            {...params}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                      ></Autocomplete>
                    )}
                  />
                </GridItem>
              )}
            </Form>
          </InputCard>
        ))}
        <AddButton
          onClick={() =>
            camposFields.append({
              obrigatorio: "yes",
              tipoCampo: TipoCampo.INPUT,
              opcoes: [],
            } as any)
          }
        >
          Adicionar Campo
        </AddButton>
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
            <Typography variant="button">
              {item ? "Salvar" : "Criar"}
            </Typography>
          </Button>
        </ButtonsWrapper>
      </DialogContent>
    </>
  );
};
