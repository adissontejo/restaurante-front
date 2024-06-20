import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
  max-width: 90%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EditButton = styled.div`
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-100%, -100%);

  padding: 12px 25px;

  background: ${({ theme }) => theme.colors.brown[400]};
  border-radius: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 200px;
  object-fit: cover;
`;

export const ImageWrapper = styled.div`
  position: relative;

  background: ${({ theme }) => theme.colors.black[50]};
  width: 140px;
  height: 140px;
  border-radius: 200px;

  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.95);

    ${EditButton} {
      filter: brightness(0.85);
    }
  }
`;
