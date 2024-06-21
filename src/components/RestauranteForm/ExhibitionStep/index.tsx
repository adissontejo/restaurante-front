import { UseFormReturn } from "react-hook-form";
import { ControlledFormField, Form } from "../../Form";
import { CircularProgress, InputAdornment } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { restauranteByDominioQuery } from "../../../services/api/restaurantes";
import { GridItem } from "../../Grid";
import { ControlledUploadImage } from "../../UploadImage";

export interface ExhibitionFormData {
  nome: string;
  dominio: string;
  descricao: string;
  logo: File;
}

export interface ExhibitionStepProps {
  form: UseFormReturn<ExhibitionFormData>;
}

export const ExhibitionStep = ({ form }: ExhibitionStepProps) => {
  const { control, watch } = form;

  const dominio = watch("dominio");

  const { isLoading } = useQuery(restauranteByDominioQuery(dominio));

  return (
    <Form>
      <GridItem>
        <ControlledUploadImage control={control} name="logo" label="Logo" />
      </GridItem>
      <ControlledFormField
        control={control}
        name="nome"
        span={6}
        label="Nome"
        placeholder="Insira o nome do restaurante"
        required
      />
      <ControlledFormField
        control={control}
        name="dominio"
        span={6}
        label="Domínio"
        placeholder="Insira o domínio do site"
        required
        InputProps={{
          endAdornment: isLoading && (
            <InputAdornment position="end">
              <CircularProgress sx={{ color: "green" }} size={20} />
            </InputAdornment>
          ),
        }}
      />
      <ControlledFormField
        control={control}
        name="descricao"
        label="Descrição"
        placeholder="Insira a descrição do restaurante"
        multiline
        minRows={4}
        maxRows={4}
      />
    </Form>
  );
};
