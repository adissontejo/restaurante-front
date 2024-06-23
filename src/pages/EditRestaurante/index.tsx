import { useState } from "react";
import {
  RestauranteForm,
  RestauranteFormProps,
} from "../../components/RestauranteForm";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { useRestaurante } from "../../hooks/useRestaurante";

export const EditRestaurante = () => {
  const { restaurante } = useRestaurante();

  const [section, setSection] =
    useState<RestauranteFormProps["currentSection"]>("exhibition");

  return (
    <>
      <TitleWithUnderline text="Dados do Restaurante" />
      <RestauranteForm
        type="update"
        currentSection={section}
        onChangeSection={setSection}
        restaurante={restaurante}
      />
    </>
  );
};
