import { Typography, Box, Card, Button } from "@mui/material";
import { BoxContent, BoxHeader } from "./styles";
import { theme } from "../../../styles/theme";

export const PaymentCard = () => {
  const valueTotal: number = 50;
  const valorPago: number = 10;
  const valorAPagar: number = 30;

  const handleConfirm = () => {
    // Aqui você pode adicionar a lógica para confirmar a compra
    console.log("Purchase confirmed");
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "24px", boxShadow: 3 }}>
      <BoxHeader
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          style={{ color: theme.colors.black[600] }}
        >
          Valor
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          style={{ color: theme.colors.black[500] }}
        >
          R$ {valueTotal}
        </Typography>
      </BoxHeader>
      <BoxContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          style={{ color: theme.colors.black[600] }}
        >
          Pagamento
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            style={{ color: theme.colors.black[600] }}
          >
            Subtotal
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{ color: theme.colors.black[500] }}
          >
            R$ {valueTotal}
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          style={{ background: theme.colors.black[600] }}
        >
          {valorPago === 0 && valorAPagar === valueTotal
            ? "PAGAR TUDO"
            : "PAGAR PARCIALMENTE" ||
              (valorPago > 0 && valueTotal - valorAPagar === 0)
            ? "PAGAR RESTANTE"
            : "PAGAR PARCIALMENTE"}
        </Button>
      </BoxContent>
    </Card>
  );
};
