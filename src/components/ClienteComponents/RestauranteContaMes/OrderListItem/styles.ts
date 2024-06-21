import styled from "styled-components";

export const VerticalLine = styled.div`
    width: 1px;
    height: 24px;
    background-color: ${({ theme }) =>  theme.colors.black[100] };
    border-radius: 10px;
`;

export const ItemDetail = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 24px;
`;

export const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) =>  theme.colors.black[100] };
    margin: 4px 32px;
`;
