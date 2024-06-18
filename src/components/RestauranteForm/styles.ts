import styled from "styled-components";

export const Container = styled.div`
  padding: 80px;

  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.xl};
`;

export const Tabs = styled.div`
  width: 100%;
  display: flex;
`;

export const TabLabel = styled.p`
  font-size: 22px;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 0 40px 16px 24px;

  flex: 1;
  border-bottom: 3px solid
    ${({ active, theme }) => theme.colors.brown[active ? 400 : 100]};

  display: flex;
  flex-direction: column;
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
