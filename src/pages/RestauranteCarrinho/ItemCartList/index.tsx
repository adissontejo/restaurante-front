import { ListItems } from "./styles";
import { ItemCart } from "../ItemCart";
import { Box, Typography } from "@mui/material";
import BoxOpen from "../../../assets/box-open.svg?react";
import { theme } from "../../../styles/theme";
import { useRestaurante } from "../../../hooks/useRestaurante";

export const ItemCartList = () => {
  const { itensCarrinho } = useRestaurante();

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
        itensCarrinho.map((_, index) => <ItemCart key={index} index={index} />)
      )}
    </ListItems>
  );
};
