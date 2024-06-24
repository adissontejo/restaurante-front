import React, { useMemo, useState } from "react";
import {
  Typography,
  Box,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import { BoxContent, BoxHeader } from "./styles";
import { theme } from "../../../styles/theme";
import { useSocket } from "../../../hooks/useSocket";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCupomsQuery } from "../../../services/api/cupons";
import { useAuth } from "../../../hooks/useAuth";
import { DialogMesa } from "../DialogMesa";

interface PaymentCardProps {}

export const PaymentCard: React.FC<PaymentCardProps> = () => {
  const { createPedido } = useSocket();
  const { usuario } = useAuth();
  const { restaurante, itensCarrinho, totalPedido, emptyCart } =
    useRestaurante();

  const navigate = useNavigate();
  const { dominio } = useParams();

  const { data: cupons } = getCupomsQuery
    .options({ enabled: !!usuario })
    .params(usuario?.id || 0, restaurante.id)
    .use();

  const [selectedCoupon, setSelectedCoupon] = useState<number>();
  const [appliedCoupon, setAppliedCoupon] = useState<number>();
  const [dialogMesa, setDialogMesa] = useState(false);

  const discount = useMemo(() => {
    if (appliedCoupon) {
      return cupons?.find((item) => item.id === appliedCoupon)?.desconto;
    }
  }, [appliedCoupon]);

  const handleConfirm = async (numeroMesa: number) => {
    try {
      await createPedido({
        numeroMesa,
        restauranteId: restaurante.id,
        itens: itensCarrinho.map((item) => ({
          instanciaItemId: item.instanciaAtiva.id,
          observacao: item.observacao,
          quantidade: item.quantidade,
          respostas: item.respostas,
        })),
        cupomId: selectedCoupon,
      });
      toast.success("Pedido criado com sucesso!");

      emptyCart();

      navigate(`/restaurante/${dominio}/pedidos`);
    } catch (error) {
      toast.error("Informações do pedido desatualizadas. Recarregue a página.");
    }
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "24px", boxShadow: 3 }}>
      <Dialog open={dialogMesa}>
        <DialogMesa
          handleClose={() => setDialogMesa(false)}
          onSubmit={handleConfirm}
        />
      </Dialog>
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
            onChange={(e) => setSelectedCoupon(e.target.value as any)}
            label="Selecione o Cupom"
            sx={{ background: theme.colors.beige[300] }}
          >
            <MenuItem value={undefined}>Nenhum</MenuItem>
            {cupons?.map((cupom) => (
              <MenuItem
                key={cupom.id}
                value={cupom.id}
                sx={{ color: theme.colors.black[300] }}
                disabled={cupom.qtPedidosFeitos < cupom.qtPedidosTotal}
              >
                Cupom Fidelidade - {cupom.qtPedidosFeitos} de{" "}
                {cupom.qtPedidosTotal}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          onClick={() => setAppliedCoupon(selectedCoupon)}
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
        {discount ? (
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
                - R$ {discount}
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
                R$ {Math.max(totalPedido - (discount || 0), 0)}
              </Typography>
            </Box>
          </>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={
            (itensCarrinho.length && (() => setDialogMesa(true))) || undefined
          }
          sx={{ marginBottom: 2 }}
          style={{ background: theme.colors.black[600] }}
        >
          Finalizar
        </Button>
      </BoxContent>
    </Card>
  );
};
