import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Tabs = styled.div`
  margin-bottom: 72px;

  width: 100%;
  display: flex;
`;

export const TabLabel = styled.p`
  font-size: 22px;
  text-align: start;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 0 40px 16px 24px;

  flex: 1;
  border-bottom: 3px solid
    ${({ active, theme }) => theme.colors.brown[active ? 400 : 100]};

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;

  cursor: pointer;
  transition: filter 0.2s;

  ${TabLabel} {
    color: ${({ active, theme }) => theme.colors.brown[active ? 600 : 300]};
  }

  &:hover {
    filter: brightness(0.75);
  }
`;

export const Step = styled.div`
  flex: 1;

  margin-bottom: 32px;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 14px;

  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;
