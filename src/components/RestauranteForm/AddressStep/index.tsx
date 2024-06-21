import { CircularProgress, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { ControlledFormField, Form } from "../../Form";
import { UseFormReturn } from "react-hook-form";
import { ViacepCepResponseDTO } from "../../../services/viacep/dtos/viacep-cep-response";
import { useQuery } from "@tanstack/react-query";
import { cepQuery } from "../../../services/viacep";

export interface AddressFormData {
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  rua: string;
  numero: number;
  complemento?: string;
}

export interface AddressStepProps {
  form: UseFormReturn<AddressFormData>;
}

export const AddressStep = ({ form }: AddressStepProps) => {
  const { control, watch, getValues, setValue } = form;

  const cep = watch("cep");

  const { data, isLoading } = useQuery(cepQuery(cep));

  useEffect(() => {
    if (cep?.length === 9 && data) {
      const mappings: Partial<
        Record<keyof ViacepCepResponseDTO, keyof AddressFormData>
      > = {
        bairro: "bairro",
        logradouro: "rua",
        complemento: "complemento",
      };

      const keys = Object.keys(mappings) as (keyof ViacepCepResponseDTO)[];

      setValue("estado", data.uf);
      setValue("cidade", data.localidade);

      keys.forEach((key) => {
        const mapping = mappings[key];

        if (mapping && !getValues(mapping)) {
          setValue(mapping, data[key]);
        }
      });
    }
  }, [cep, data]);

  return (
    <Form>
      <ControlledFormField
        control={control}
        name="cep"
        label="CEP"
        placeholder="Insira o cep"
        mask="99999-999"
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
        span={8}
        name="cidade"
        label="Cidade"
        disabled
        required
      />
      <ControlledFormField
        control={control}
        span={4}
        name="estado"
        label="Estado"
        disabled
        required
      />
      <ControlledFormField
        control={control}
        name="bairro"
        label="Bairro"
        placeholder="Insira o bairro"
        required
      />
      <ControlledFormField
        control={control}
        span={8}
        name="rua"
        label="Rua"
        placeholder="Insira a rua"
        required
      />
      <ControlledFormField
        control={control}
        span={4}
        name="numero"
        label="Número"
        placeholder="Insira o número"
        type="number"
        required
      />
      <ControlledFormField
        control={control}
        name="complemento"
        label="Complemento"
        placeholder="Insira o complemento"
      />
    </Form>
  );
};
