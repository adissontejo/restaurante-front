import styled from "styled-components";

export const Line = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    width: 40%;
    min-width: 60px;
    background-color: ${({ theme }) =>  theme.colors.beige[500] };
    border-radius: 10px;
`;
