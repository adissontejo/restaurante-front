import styled from "styled-components";

export const BoxHeader = styled.div`
    display: flex;
    gap: 56px;
    align-items: center;
    margin-bottom: 56px;
`;

export const VerticalLine = styled.div`
    width: 1px;
    height: 56px;
    background-color: ${({ theme }) =>  theme.colors.black[200] };
    border-radius: 10px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 24px;
    width: 100%;
    justify-content: flex-end;
    padding-top: 12px;
    margin-top: auto;
    border-top: 1px solid ${({ theme }) =>  theme.colors.black[100] };
`;
