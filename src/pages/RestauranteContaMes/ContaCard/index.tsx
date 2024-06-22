import { useState } from "react";
import { BoxPayment, Card } from "./styles";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Check from "../../../assets/check.svg?react";
import { NumericFormat } from "react-number-format";
import { theme } from "../../../styles/theme";

export const ContaCard = () => {
  const [paymentAmount, setPaymentAmount] = useState<number>(20.0);

  const handleValueChange = (values: { value: string }) => {
    const { value } = values;
    const numericValue = parseFloat(value);

    setPaymentAmount(numericValue);
  };

  return (
    <Card>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ color: theme.colors.black[400] }}
      >
        Prestação de Contas
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={9} md={3}>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.colors.black[400] }}
          >
            Pendente
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 800, color: theme.colors.black[600] }}
          >
            R$ 40,00
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} md={9}>
          <NumericFormat
            value={paymentAmount}
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            thousandSeparator={false} // Remover separador de milhar
            prefix={"R$ "}
            customInput={TextField}
            label="Quanto desse valor será pago?"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "4px", background: theme.colors.beige[300] }}
            onValueChange={handleValueChange}
          />
          {paymentAmount > 40 ? (
            <Typography variant="body2" sx={{ color: theme.colors.red[400] }}>
              {" "}
              Valor acima do Máximo!{" "}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      <BoxPayment>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.colors.black[300] }}
          >
            Valor pago
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 800, color: theme.colors.black[500] }}
          >
            R$ 40,00
          </Typography>
        </Box>
        <Check />
      </BoxPayment>
    </Card>
  );
};
