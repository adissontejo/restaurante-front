import { Body, Container, StepConnector, StepWrapper, Stepper } from "./styles";
import { steps } from "./constants";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { RestauranteForm } from "../../components/RestauranteForm";
import { LeftPanel } from "../../components/LeftPanel";

export const CreateRestaurante = () => {
  const [activeStep] = useState(0);

  return (
    <Container>
      <LeftPanel>
        <Stepper>
          {steps.map(({ icon: Icon }, index) => (
            <Fragment key={index}>
              {index > 0 && <StepConnector />}
              <StepWrapper active={activeStep === index}>
                <Icon />
              </StepWrapper>
            </Fragment>
          ))}
        </Stepper>
      </LeftPanel>
      <Body>
        <RestauranteForm />
      </Body>
    </Container>
  );
};
