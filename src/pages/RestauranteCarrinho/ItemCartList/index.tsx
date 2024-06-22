import { ListItems } from "./styles";
import { ItemCart } from "../ItemCart";
import { Box, Typography } from "@mui/material";
import BoxOpen from "../../../assets/box-open.svg?react";
import { ItemPedido } from "../../../data";
import { theme } from "../../../styles/theme";
import { useRestaurante } from "../../../hooks/useRestaurante";

export const ItemCartList = () => {
  const { itensCarrinho, handleAlterCart } = useRestaurante();

  const handleDecrementItem = (id: number) => {
    const newList = itensCarrinho
      .map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };
          if (updatedItem.quantidade > 1) {
            updatedItem.quantidade -= 1;
          } else {
            return null;
          }
          return updatedItem;
        }
        return item;
      })
      .filter((item) => item !== null) as ItemPedido[];

    handleAlterCart(newList);
  };

  const handleIncrementItem = (id: number) => {
    const newList = itensCarrinho.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item };
        updatedItem.quantidade += 1;
        return updatedItem;
      }
      return item;
    });

    handleAlterCart(newList);
  };

  return (
    <ListItems>
      {itensCarrinho.length == 0 ? (
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px",
            gap: "16px",
          }}
        >
          <BoxOpen style={{ height: "40px" }} />
          <Typography variant="h6" style={{ color: theme.colors.beige[900] }}>
            {" "}
            Adicione Itens para prosseguir{" "}
          </Typography>
        </Box>
      ) : (
        itensCarrinho.map((itemPedido, index) => (
          <ItemCart
            key={index}
            itemPedido={itemPedido}
            onIncrement={handleIncrementItem}
            onDecrement={handleDecrementItem}
          />
        ))
      )}
    </ListItems>
  );
};
