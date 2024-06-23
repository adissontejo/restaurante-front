import { Container, Body } from "./styles";
import { LateralMenu } from "../LateralMenu";
import { Outlet } from "react-router-dom";

export const AppContainer = () => {
  return (
    <Container>
      <LateralMenu />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};
