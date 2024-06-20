import styled from "styled-components";

export const Container = styled.div`
  padding: 16px 32px;

  width: 100%;
  background: ${({ theme }) => theme.colors.brown[50]};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

export const Label = styled.p`
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: 20px;
  font-weight: 700;
`;

export const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Value = styled.p`
  color: ${({ theme }) => theme.colors.brown[500]};
  font-size: 20px;
  font-weight: 500;
`;

export const EditButton = styled.button`
  padding: 12px 25px;

  background: ${({ theme }) => theme.colors.brown[400]};
  border-radius: 15px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.85);
  }
`;
