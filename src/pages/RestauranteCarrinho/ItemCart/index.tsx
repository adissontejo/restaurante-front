import React, { useState } from "react";
import { Typography, IconButton, Box, Collapse } from "@mui/material";
import { CountButton, ItemContainer, ItemImage, BoxNumber } from "./styles";
import Plus from "../../../assets/plus.svg?react";
import Minus from "../../../assets/minus.svg?react";
import AngleSmallDown from "../../../assets/angle-small-down.svg?react";
import { theme } from "../../../styles/theme";
import { ItemPedido } from "../../../data";

interface ItemCartProps {
  itemPedido: ItemPedido;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}

export const ItemCart: React.FC<ItemCartProps> = ({
  itemPedido,
  onIncrement,
  onDecrement,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);

  const item = itemPedido.instanciaItem.item;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIconRotation(showDetails ? 0 : 180);
  };

  return (
    <>
      <ItemContainer>
        <Box sx={{ width: "60%", display: "flex", gap: "8px" }}>
          <ItemImage src={item.urlImagem} alt={item.nome} />
          <Box>
            <Typography
              variant="h6"
              sx={{ color: theme.colors.black[600], fontWeight: 800 }}
            >
              {item.nome}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.colors.black[400], fontWeight: 500 }}
            >
              R$ {itemPedido.instanciaItem.preco} x {itemPedido.quantidade} = R${" "}
              {itemPedido.quantidade * itemPedido.instanciaItem.preco}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <CountButton onClick={() => onDecrement(itemPedido.id)}>
            <Minus
              style={{
                color: theme.colors.black[500],
                height: "16px",
                marginRight: "8px",
              }}
            />
          </CountButton>
          <BoxNumber>
            <Typography
              variant="body2"
              sx={{ mx: 2, color: theme.colors.black[500], fontWeight: 800 }}
            >
              {itemPedido.quantidade}
            </Typography>
          </BoxNumber>
          <CountButton onClick={() => onIncrement(itemPedido.id)}>
            <Plus style={{ color: theme.colors.black[500], height: "16px" }} />
          </CountButton>
        </Box>
        <IconButton
          onClick={() => toggleDetails()}
          style={{ background: theme.colors.beige[700], height: "100%" }}
        >
          <AngleSmallDown
            style={{
              color: theme.colors.white[500],
              height: "20px",
              width: "20px",
              transform: `rotate(${iconRotation}deg)`,
            }}
          />
        </IconButton>
      </ItemContainer>
      <Collapse
        in={showDetails}
        timeout="auto"
        unmountOnExit
        style={{ padding: "0px 16px" }}
      >
        <Typography
          variant="body2"
          style={{
            color: theme.colors.black[400],
            borderTop: "1px solid " + theme.colors.beige[600],
            padding: "8px 0",
          }}
        >
          {" "}
          {itemPedido.observacao}{" "}
        </Typography>
      </Collapse>
    </>
  );
};
