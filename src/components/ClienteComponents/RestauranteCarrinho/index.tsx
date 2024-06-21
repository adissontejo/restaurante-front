import { TitleWithUnderline } from "../../TitleWithUnderline";
import { ItemPedido } from "../../../data";
import { ItemCartList } from "./ItemCartList";
import { Grid } from "@mui/material";
import { PaymentCard } from "./PaymentCard";
import { useState } from "react";
import { calculaTotalPedido } from "../../../utils";

interface RestauranteCarrinhoProps {
    items: ItemPedido[];
    onAlter: (items: ItemPedido[]) => void;
}

export const RestauranteCarrinho: React.FC<RestauranteCarrinhoProps> = ({ items, onAlter }) => {

    const [ totalPedido, setTotalPedido ] = useState(calculaTotalPedido(items));
    const handleAlter = (items: ItemPedido[]) => {
        onAlter(items);
      }

    return (
        <>
            <TitleWithUnderline text="Carrinho" />
            <Grid container spacing={12}>
                <Grid item xs={12} sm={4} md={8}>
                    <ItemCartList  itens={items} onUpdate={handleAlter}  totalPedido={totalPedido} onChangeTotal={setTotalPedido} />
                </Grid>
                <Grid item xs={12} sm={8} md={4}>
                    <PaymentCard totalPedido={totalPedido} onChangeTotal={setTotalPedido} />
                </Grid>
            </Grid>
        </>
    );
};
