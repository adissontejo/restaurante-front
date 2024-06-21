import React from 'react';
import { Pedido, Usuario, pedidos } from '../../../../data';
import { OrderListItem } from '../OrderListItem';
import { BoxList } from './styles';

interface OrderListProps {
    usuario: Usuario;
}

export const OrderList: React.FC<OrderListProps> = ({ usuario }) => {

    const ordersList: Pedido[] = pedidos.filter((pedido) => pedido.usuarioId === usuario.id);

    return (
        <BoxList>
            {ordersList.map((order, index) => (
                <OrderListItem pedido={order} key={index} />
            ))}
        </BoxList>
    );
};
