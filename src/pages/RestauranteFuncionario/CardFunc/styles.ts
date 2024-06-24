import styled from "styled-components";

export const CardItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const CardWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* Mantém a proporção 1:1 (altura igual à largura) */
    overflow: hidden;

    &:hover .icon {
        opacity: 1;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const IconDiv = styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 50%;
    transition: opacity 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
`;
