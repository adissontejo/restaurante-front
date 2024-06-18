import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: white;

  display: flex;
`;

export const Stepper = styled.div`
  padding: 100px 50px;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StepWrapper = styled.div<{ active: boolean }>`
  padding: 24px 32px;

  background: ${({ active }) => (active ? "white" : "transparent")};
  border-radius: 50px;

  path {
    fill: ${({ theme, active }) => theme.colors.brown[active ? 900 : 200]};
  }
`;

export const StepConnector = styled.div`
  flex: 1;
  width: 4px;
  background: ${({ theme }) => theme.colors.brown[200]};
`;
