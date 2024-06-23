import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BoxContent, BoxHeader } from "./styles";
import { theme } from "../../../styles/theme";
import { useSocket } from "../../../hooks/useSocket";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface PaymentCardProps {}

export const PaymentCard: React.FC<PaymentCardProps> = () => {
  const { createPedido } = useSocket();
  const { restaurante, itensCarrinho, totalPedido, emptyCart } =
    useRestaurante();

  const navigate = useNavigate();
  const { dominio } = useParams();

  const [selectedCoupon, setSelectedCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const handleCouponChange = (event: SelectChangeEvent) => {
    setSelectedCoupon(event.target.value);
  };

  const handleApplyCoupon = () => {
    if (selectedCoupon === "CUPOM10") setDiscount(0.1);
    if (selectedCoupon === "CUPOM20") setDiscount(0.2);
    if (selectedCoupon === "CUPOM30") setDiscount(0.3);
    if (selectedCoupon === "") setDiscount(0);

    console.log(`Coupon applied: ${selectedCoupon}`);
  };

  const handleConfirm = async () => {
    if (!itensCarrinho.length) {
      return;
    }

    await createPedido({
      numeroMesa: 40,
      funcionarioId: 2,
      restauranteId: restaurante.id,
      itens: itensCarrinho.map((item) => ({
        instanciaItemId: item.instanciaAtiva.id,
        observacao: item.observacao,
        quantidade: item.quantidade,
      })),
    });
    toast.success("Pedido criado com sucesso!");

    emptyCart();

    navigate(`/restaurante/${dominio}/historico/pedidos`);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "24px", boxShadow: 3 }}>
      <BoxHeader>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          style={{ color: theme.colors.black[600] }}
        >
          Cupom
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel id="select-coupon-label">Selecione o Cupom</InputLabel>
          <Select
            labelId="select-coupon-label"
            id="select-coupon"
            value={selectedCoupon}
            label="Selecione o Cupom"
            onChange={handleCouponChange}
            sx={{ background: theme.colors.beige[300] }}
          >
            <MenuItem value="" sx={{ color: theme.colors.black[300] }}>
              Nenhum
            </MenuItem>
            <MenuItem value="CUPOM10" sx={{ color: theme.colors.black[400] }}>
              CUPOM10 - 10% off
            </MenuItem>
            <MenuItem value="CUPOM20" sx={{ color: theme.colors.black[400] }}>
              CUPOM20 - 20% off
            </MenuItem>
            <MenuItem value="CUPOM30" sx={{ color: theme.colors.black[400] }}>
              CUPOM30 - 30% off
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          onClick={handleApplyCoupon}
          style={{ background: theme.colors.black[600] }}
        >
          Aplicar
        </Button>
      </BoxHeader>
      <BoxContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          style={{ color: theme.colors.black[600] }}
        >
          Valor
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body1"
            style={{ color: theme.colors.black[500] }}
          >
            {discount !== 0 ? "Subtotal" : "Total"}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{ color: theme.colors.black[500] }}
          >
            R$ {totalPedido}
          </Typography>
        </Box>
        {discount !== 0 ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="body2"
                style={{ color: theme.colors.green[500] }}
              >
                Cupom
              </Typography>
              <Typography
                variant="body1"
                style={{ color: theme.colors.green[500] }}
              >
                - R$ {discount * totalPedido}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="body2"
                style={{ color: theme.colors.black[500] }}
              >
                Total
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                style={{ color: theme.colors.black[500] }}
              >
                R$ {(1 - discount) * totalPedido}
              </Typography>
            </Box>
          </>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleConfirm}
          sx={{ marginBottom: 2 }}
          style={{ background: theme.colors.black[600] }}
        >
          Finalizar
        </Button>
      </BoxContent>
    </Card>
  );
};