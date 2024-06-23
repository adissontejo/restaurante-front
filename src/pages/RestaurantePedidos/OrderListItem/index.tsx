import React, { useState } from "react";
import {
  Typography,
  Box,
  Collapse,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ItemDetail, Line, VerticalLine } from "./styles";
import AngleSmallDown from "../../../assets/angle-small-down.svg?react";
import { theme } from "../../../styles/theme";
import { calculaTotalPedido } from "../../../utils";
import { PedidoResponseDTO } from "../../../services/api/dtos/pedido-response.dto";
import { format } from "date-fns";

interface OrderListItemProps {
  pedido: PedidoResponseDTO;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({ pedido }) => {
  const [expanded, setExpanded] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);
  const valorTotal = calculaTotalPedido(pedido);

  const handleToggleDetails = () => {
    setExpanded(!expanded);
    setIconRotation(expanded ? 0 : 180);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Card
        sx={{ borderRadius: "24px", padding: "8px 24px", boxShadow: 3 }}
        onClick={handleToggleDetails}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography
              variant="h6"
              style={{ color: theme.colors.black[500], fontWeight: 800 }}
            >
              R$ {valorTotal.toFixed(2)}
            </Typography>
            <VerticalLine />
            <Typography
              variant="body1"
              style={{ color: theme.colors.black[300], fontWeight: 600 }}
            >
              {pedido.itens.reduce((acc, item) => acc + item.quantidade, 0)}{" "}
              ITENS
            </Typography>
            <VerticalLine />
            <Typography
              variant="body1"
              style={{ color: theme.colors.black[300], fontWeight: 600 }}
            >
              {format(pedido.dataHora, "dd/MM/yyyy HH:mm:ss")}
            </Typography>
            <IconButton
              onClick={handleToggleDetails}
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
          </Box>
        </CardContent>
      </Card>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card sx={{ borderRadius: "24px", boxShadow: 3 }}>
          {pedido.itens.map((itemPedido, itemIndex) => (
            <React.Fragment key={itemPedido.id}>
              <ItemDetail>
                <Box mb={1}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ color: theme.colors.black[400] }}
                  >
                    {itemPedido.instanciaItem.item.nome}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: theme.colors.black[400] }}
                  >
                    {itemPedido.observacao}
                  </Typography>
                </Box>
                <VerticalLine />
                <Typography
                  variant="body2"
                  align="right"
                  style={{ color: theme.colors.black[400] }}
                >
                  {itemPedido.quantidade}{" "}
                  {itemPedido.quantidade > 1 ? "PORÇÕES" : "PORÇÃO"}
                </Typography>
              </ItemDetail>
              {pedido.itens.length != itemIndex + 1 && <Line />}
            </React.Fragment>
          ))}
        </Card>
      </Collapse>
    </Box>
  );
};
