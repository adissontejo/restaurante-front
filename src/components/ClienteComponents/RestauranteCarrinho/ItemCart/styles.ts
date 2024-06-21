import styled from "styled-components";
import { theme } from "../../../../styles/theme";


export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
`;

export const ItemImage = styled('img')({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  marginRight: '16px',
});

export const CountButton = styled.div`
  cursor: pointer;
`;

export const BoxNumber = styled.div`

    background: ${theme.colors.white[500]};
    padding: 4px 10px;
    border-radius: 15px
`;
