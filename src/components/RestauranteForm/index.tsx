import { sections } from "./constants";
import {
  ButtonsWrapper,
  Container,
  Tab,
  TabLabel,
  Tabs,
  Wrapper,
  Step,
} from "./styles";
import { ExhibitionStep } from "./ExhibitionStep";
import { Divider } from "@mui/material";
import { Button } from "../Button";
import { AddressStep } from "./AddressStep";
import { useForms } from "./useForms";
import { SchedulesStep } from "./SchedulesStep";
import { CouponsStep } from "./CouponsStep";
import { RestauranteResponseDTO } from "../../services/api/dtos/restaurante-response.dto";

export interface RestauranteFormProps {
  type?: "create" | "update";
  currentSection?: "exhibition" | "address" | "schedules" | "coupons";
  onForward?: () => void;
  onBack?: () => void;
  onChangeSection?: (section: RestauranteFormProps["currentSection"]) => void;
  restaurante?: RestauranteResponseDTO;
}

export const RestauranteForm = ({
  type = "create",
  currentSection,
  onForward,
  onBack,
  onChangeSection,
  restaurante,
}: RestauranteFormProps) => {
  const {
    exhibitionForm,
    addressForm,
    schedulesForm,
    couponsForm,
    handleNextStep,
    handlePreviousStep,
  } = useForms({
    currentSection,
    onBack,
    onForward,
    type,
    restaurante,
  });

  return (
    <Container>
      <Wrapper>
        <Tabs>
          {sections.map((item, index) => (
            <Tab
              key={index}
              active={currentSection === item.key}
              onClick={() => type === "update" && onChangeSection?.(item.key)}
            >
              <TabLabel>{item.label}</TabLabel>
            </Tab>
          ))}
        </Tabs>
        <Step>
          {currentSection === "exhibition" && (
            <ExhibitionStep
              form={exhibitionForm}
              placeholderLogoUrl={restaurante?.logoUrl || undefined}
            />
          )}
          {currentSection === "address" && <AddressStep form={addressForm} />}
          {currentSection === "schedules" && (
            <SchedulesStep form={schedulesForm} />
          )}
          {currentSection === "coupons" && <CouponsStep form={couponsForm} />}
        </Step>
        <Divider sx={{ marginTop: "auto" }} />
        <ButtonsWrapper>
          {(type === "update" || currentSection !== "exhibition") && (
            <Button onClick={handlePreviousStep}>
              {type === "update" ? "Cancelar" : "Voltar"}
            </Button>
          )}
          <Button variant="dark" onClick={handleNextStep}>
            {type === "update"
              ? "Salvar"
              : currentSection === "coupons"
              ? "Criar"
              : "Continuar"}
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
};
