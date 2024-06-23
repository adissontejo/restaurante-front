import styled from "styled-components";
import backgroundImg from "../../assets/background.png";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: center no-repeat url(${backgroundImg});

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export const BoxTitle = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Overlay = styled.div`
    padding: 16px;

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    background: rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
    gap: 48px;
`;

export const Title = styled.h1`
  color: white;
  font-size: 60px;
`;

export const Strong = styled.strong`
  color: white;
  font-size: 60px;
  font-weight: 800;
`;

export const Description = styled.p`
  color: white;
  font-size: 25px;
  text-align: center;
  max-width: ${({ theme }) => theme.breakpoints.md};
`;

export const ButtonsWrapper = styled.div`
  margin-top: 12px;

  display: flex;
  gap: 40px;
`;
