import { steps } from "./constants";
import { Container, Tab, TabLabel, Tabs, Wrapper } from "./styles";
import { useState } from "react";

export const RestauranteForm = () => {
  const [tab] = useState(0);

  return (
    <Container>
      <Wrapper>
        <Tabs>
          {steps.map((step, index) => (
            <Tab key={index} active={tab === index}>
              <TabLabel>{step.label}</TabLabel>
            </Tab>
          ))}
        </Tabs>
      </Wrapper>
    </Container>
  );
};
