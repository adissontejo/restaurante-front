import styled from "styled-components";

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 24px;
    width: 100%;
    justify-content: flex-end;
    padding-top: 12px;
    margin-top: auto;
    border-top: 1px solid ${({ theme }) =>  theme.colors.black[100] };
`;

export const BoxImage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    border-radius: 24px;
    overflow: hidden;
`;

export const BoxTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
