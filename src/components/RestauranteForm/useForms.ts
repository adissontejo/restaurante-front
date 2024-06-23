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
import {
  createRestauranteMutation,
  updateRestauranteMutation,
} from "../../services/api/restaurantes";
import { useNavigate, useParams } from "react-router-dom";
import { WeekDays } from "../../constants";
import { formatTime } from "../../utils";
import { RestauranteResponseDTO } from "../../services/api/dtos/restaurante-response.dto";
import { parse } from "date-fns";
import { useEffect } from "react";

export type Section = (typeof sections)[number]["key"];

export interface UseFormsProps {
  currentSection?: Section;
  onBack?: () => void;
  onForward?: () => void;
  type: "create" | "update";
  restaurante?: RestauranteResponseDTO;
}

export const useForms = ({
  currentSection,
  onBack,
  onForward,
  type,
  restaurante,
}: UseFormsProps) => {
  const navigate = useNavigate();

  const { dominio } = useParams();

  const formDefaultValues = {
    exhibition: {
      nome: restaurante?.nome || "",
      dominio: restaurante?.dominio || "",
      descricao: restaurante?.descricao || "",
    },
    address: {
      cep: restaurante?.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") || "",
      cidade: restaurante?.cidade || "",
      estado: restaurante?.estado || "",
      bairro: restaurante?.bairro || "",
      complemento: restaurante?.complemento || "",
      numero: restaurante?.numero || ("" as any),
      rua: restaurante?.rua || "",
    },
    schedule: WeekDays.reduce((acc, day) => {
      if (restaurante) {
        const data = restaurante.horarios
          .filter((item) => item.diaSemana === day.value)
          .map((item) => {
            const abertura = new Date(
              parse(item.abertura, "HH:mm:ss", new Date())
            );
            const fechamento = new Date(
              parse(item.fechamento, "HH:mm:ss", new Date())
            );

            return {
              abertura,
              fechamento,
            };
          });

        return {
          ...acc,
          [day.value]: data,
        };
      }

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
    coupons: {
      enabled: (restaurante?.qtPedidosFidelidade ? "yes" : "no") as
        | "yes"
        | "no",
      qtPedidosFidelidade: restaurante?.qtPedidosFidelidade || undefined,
      valorFidelidade: restaurante?.valorFidelidade || undefined,
    },
  };

  const createRestaurante = createRestauranteMutation.use();
  const updateRestaurante = updateRestauranteMutation.use();

  const exhibitionForm = useForm<ExhibitionFormData>({
    resolver: zodResolver(exhibitionFormSchema(restaurante?.dominio)),
    mode: "onTouched",
    defaultValues: formDefaultValues.exhibition,
  });
  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    mode: "onTouched",
    defaultValues: formDefaultValues.address,
  });
  const schedulesForm = useForm<SchedulesFormData>({
    defaultValues: formDefaultValues.schedule,
  });
  const couponsForm = useForm<CoupounsFormData>({
    resolver: zodResolver(couponsFormSchema),
    mode: "onTouched",
    defaultValues: {
      enabled: "no",
    },
  });

  const reset = () => {
    exhibitionForm.reset(formDefaultValues.exhibition);
    addressForm.reset(formDefaultValues.address);
    schedulesForm.reset(formDefaultValues.schedule);
    couponsForm.reset(formDefaultValues.coupons);
  };

  const forms = {
    exhibition: exhibitionForm,
    address: addressForm,
    schedules: schedulesForm,
    coupons: couponsForm,
  };
  const currentForm = forms[currentSection || "exhibition"];

  useEffect(() => {
    reset();
  }, [restaurante]);

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
    }
    if (type === "update" || currentSection === "coupons") {
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

      const createData = {
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
      };

      const updateData = (() => {
        switch (currentSection) {
          case "exhibition":
            return {
              nome: exhibitionData.nome,
              dominio: exhibitionData.dominio,
              descricao: exhibitionData.descricao,
              logo: exhibitionData.logo,
            };
          case "address":
            return {
              cep: addressData.cep.replace(/\D/g, ""),
              complemento: addressData.complemento,
              numero: addressData.numero,
              rua: addressData.rua,
            };
          case "schedules":
            return {
              horarios,
            };
          case "coupons":
            return {
              qtPedidosFidelidade: couponsData.qtPedidosFidelidade,
              valorFidelidade: couponsData.valorFidelidade,
            };
          default:
            return {};
        }
      })();

      if (type === "create") {
        createRestaurante.mutate(createData, {
          onSuccess(data) {
            toast.success("Restaurante criado com sucesso!");
            navigate(`/restaurante/${data.dominio}/admin`);
          },
          onError() {
            toast.error("Erro ao criar restaurante");
          },
        });
      } else {
        updateRestaurante.mutate(
          {
            restaurante: updateData,
            id: restaurante?.id || 0,
          },
          {
            onSuccess() {
              if (updateData.dominio && updateData.dominio !== dominio) {
                navigate(`/restaurante/${updateData.dominio}/admin/dados`);
              }
              toast.success("Restaurante atualizado com sucesso!");
            },
            onError() {
              toast.error("Erro ao atualizar restaurante");
            },
          }
        );
      }

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
    reset,
  };
};
