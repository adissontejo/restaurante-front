import { UseFormReturn } from "react-hook-form";
import { ControlledBooleanRadio } from "../../BooleanRadio";
import { ControlledFormField, Form } from "../../Form";
import { GridItem } from "../../Grid";

export interface CoupounsFormData {
  enabled: "yes" | "no";
  qtPedidosFidelidade: number;
  valorFidelidade: number;
}

export interface CouponsStepProps {
  form: UseFormReturn<CoupounsFormData>;
}

export const CouponsStep = ({ form }: CouponsStepProps) => {
  const { control, watch } = form;

  const enabled = watch("enabled");

  console.log(form?.getValues());

  return (
    <Form>
      <GridItem>
        <ControlledBooleanRadio
          control={control}
          name="enabled"
          onValue="yes"
          offValue="no"
          onLabel="Sim"
          offLabel="Não"
          label="Deseja ativar cupom de fidelidade?"
        />
      </GridItem>
      {enabled === "yes" && (
        <>
          <ControlledFormField
            control={control}
            name="qtPedidosFidelidade"
            label="Quantidade de Pedidos Necessária para gerar cupom"
            span={8}
            required
            type="number"
          />
          <ControlledFormField
            control={control}
            name="valorFidelidade"
            label="Valor do Cupom"
            span={4}
            required
            type="number"
          />
        </>
      )}
    </Form>
  );
};
