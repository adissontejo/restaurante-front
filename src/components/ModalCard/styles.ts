import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 32px 40px;

  background: white;
  border-radius: 30px;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-bottom: 32px;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: 20px;
`;
