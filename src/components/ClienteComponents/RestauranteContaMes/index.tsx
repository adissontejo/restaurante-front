import { useState } from "react";
import { ListTab } from "../../ListTab";
import { TitleWithUnderline } from "../../TitleWithUnderline";
import { OrderList } from "./OrdersList";
import { Grid } from "@mui/material";
import { Usuario } from "../../../data";
import { ContaCard } from "./ContaCard";
import { PaymentCard } from "./PaymentCard";

interface RestauranteContaMesProps {
    usuario: Usuario;
}

export const RestauranteContaMes: React.FC<RestauranteContaMesProps> = ({ usuario }) => {

    const itensTab = [ 'Conta', 'Pedidos' ];
    const [activeItem, setActiveItem] = useState(itensTab[0]);

    const handleClickItemMenu = (categoria : string) => {
        setActiveItem(categoria);
    };

    return (
        <>
            <TitleWithUnderline text="Conta do Mês" />
            <ListTab items={itensTab} handleClick={handleClickItemMenu} />
            { activeItem === 'Conta' ? (
                <Grid container spacing={12}>
                    <Grid item xs={12} sm={4} md={8}>
                        <ContaCard usuario={usuario} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <PaymentCard />
                    </Grid>
                </Grid>
            ) :
                <OrderList usuario={usuario} />
            }
        </>
    );
};
