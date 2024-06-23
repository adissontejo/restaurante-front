import { useForm } from "react-hook-form";
import { AddressFormData } from "./AddressStep";
import { CoupounsFormData } from "./CouponsStep";
import { ExhibitionFormData } from "./ExhibitionStep";
import {
  addressFormSchema,
  couponsFormSchema,
  exhibitionFormSchema,
  sections,
} from "./constants";
import { toast } from "react-toastify";
import { SchedulesFormData } from "./SchedulesStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { Horario } from "./SchedulesStep/SchedulePicker/ModalForm";
import { createRestauranteMutation } from "../../services/api/restaurantes";
import { useNavigate } from "react-router-dom";
import { WeekDays } from "../../constants";
import { formatTime } from "../../utils";

export type Section = (typeof sections)[number]["key"];

export interface UseFormsProps {
  currentSection?: Section;
  onBack?: () => void;
  onForward?: () => void;
}

export const useForms = ({
  currentSection,
  onBack,
  onForward,
}: UseFormsProps) => {
  const navigate = useNavigate();

  const createRestaurante = createRestauranteMutation.use();

  const exhibitionForm = useForm<ExhibitionFormData>({
    resolver: zodResolver(exhibitionFormSchema),
    mode: "onTouched",
    defaultValues: {
      nome: "",
      dominio: "",
      descricao: "",
    },
  });
  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    mode: "onTouched",
    defaultValues: {
      cep: "",
      cidade: "",
      estado: "",
      bairro: "",
      complemento: "",
      numero: "" as any,
      rua: "",
    },
  });
  const schedulesForm = useForm<SchedulesFormData>({
    defaultValues: WeekDays.reduce((acc, day) => {
      const abertura = new Date();
      const fechamento = new Date();

      abertura.setHours(8, 0, 0);
      fechamento.setHours(22, 0, 0);

      return {
        ...acc,
        [day.value]: [
          {
            abertura,
            fechamento,
          },
        ],
      };
    }, {}),
  });
  const couponsForm = useForm<CoupounsFormData>({
    resolver: zodResolver(couponsFormSchema),
    mode: "onTouched",
    defaultValues: {
      enabled: "no",
    },
  });

  const forms = {
    exhibition: exhibitionForm,
    address: addressForm,
    schedules: schedulesForm,
    coupons: couponsForm,
  };
  const currentForm = forms[currentSection || "exhibition"];

  const handlePreviousStep = () => {
    onBack?.();
  };

  const handleNextStep = currentForm?.handleSubmit(async () => {
    if (currentSection === "schedules") {
      const horarios = schedulesForm.getValues();

      if (Object.values<Horario[]>(horarios).every((value) => !value.length)) {
        toast.error("Deve haver ao menos um horário!");
        return;
      }
    } else if (currentSection === "coupons") {
      const exhibitionData = exhibitionForm.getValues();
      const addressData = addressForm.getValues();
      const schedulesData = schedulesForm.getValues();
      const couponsData = couponsForm.getValues();

      const horarios = WeekDays.flatMap((item) => {
        return schedulesData[item.value].map((horario) => {
          return {
            abertura: formatTime(horario.abertura),
            fechamento: formatTime(horario.fechamento),
            diaSemana: item.value,
          };
        });
      });

      createRestaurante.mutate(
        {
          nome: exhibitionData.nome,
          dominio: exhibitionData.dominio,
          descricao: exhibitionData.descricao,
          logo: exhibitionData.logo,
          cep: addressData.cep.replace(/\D/g, ""),
          complemento: addressData.complemento,
          numero: addressData.numero,
          rua: addressData.rua,
          horarios,
          qtPedidosFidelidade: couponsData.qtPedidosFidelidade,
          valorFidelidade: couponsData.valorFidelidade,
        },
        {
          onSuccess(data) {
            navigate(`/restaurante/${data.dominio}`);
          },
          onError() {
            toast.error("Erro ao criar restaurante");
          },
        }
      );

      return;
    }

    onForward?.();
  });

  return {
    exhibitionForm,
    addressForm,
    schedulesForm,
    couponsForm,
    currentForm,
    handlePreviousStep,
    handleNextStep,
  };
};
