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

export interface RestauranteFormProps {
  type?: "create" | "update";
  currentSection?: "exhibition" | "address" | "schedules" | "coupons";
  onForward?: () => void;
  onBack?: () => void;
}

export const RestauranteForm = ({
  currentSection,
  onForward,
  onBack,
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
  });

  return (
    <Container>
      <Wrapper>
        <Tabs>
          {sections.map((item, index) => (
            <Tab key={index} active={currentSection === item.key}>
              <TabLabel>{item.label}</TabLabel>
            </Tab>
          ))}
        </Tabs>
        <Step>
          {currentSection === "exhibition" && (
            <ExhibitionStep form={exhibitionForm} />
          )}
          {currentSection === "address" && <AddressStep form={addressForm} />}
          {currentSection === "schedules" && (
            <SchedulesStep form={schedulesForm} />
          )}
          {currentSection === "coupons" && <CouponsStep form={couponsForm} />}
        </Step>
        <Divider sx={{ marginTop: "auto" }} />
        <ButtonsWrapper>
          {currentSection !== "exhibition" && (
            <Button onClick={handlePreviousStep}>Voltar</Button>
          )}
          <Button variant="dark" onClick={handleNextStep}>
            {currentSection === "coupons" ? "Criar" : "Continuar"}
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
};
