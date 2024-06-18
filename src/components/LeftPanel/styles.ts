import styled from "styled-components";
import backgroundImg from "../../assets/background.png";

export const Container = styled.aside`
  height: 100%;
  background: center no-repeat url(${backgroundImg});
  border-radius: 0 30px 30px 0;
  box-shadow: 8px 4px 50px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(106, 55, 12, 0.64);
`;
