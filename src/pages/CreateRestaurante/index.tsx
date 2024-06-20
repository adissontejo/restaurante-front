import { Container, StepConnector, StepWrapper, Stepper } from "./styles";
import { steps } from "./constants";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { RestauranteForm } from "../../components/RestauranteForm";
import { LeftPanel } from "../../components/LeftPanel";
import Complete from "../../assets/complete.svg?react";

export const CreateRestaurante = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Container>
      <LeftPanel>
        <Stepper>
          {steps.map(({ icon: Icon }, index) => (
            <Fragment key={index}>
              {index > 0 && <StepConnector />}
              <StepWrapper
                active={activeStep === index}
                complete={index < activeStep}
              >
                {index < activeStep ? <Complete /> : <Icon />}
              </StepWrapper>
            </Fragment>
          ))}
        </Stepper>
      </LeftPanel>
      <RestauranteForm
        currentSection={steps[activeStep].key}
        onBack={() => setActiveStep((prev) => prev - 1)}
        onForward={() => setActiveStep((prev) => prev + 1)}
      />
    </Container>
  );
};
