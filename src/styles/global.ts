import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: 'Mulish', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: white;
  }

  button {
    background: none;
    border: none;
  }
`;
