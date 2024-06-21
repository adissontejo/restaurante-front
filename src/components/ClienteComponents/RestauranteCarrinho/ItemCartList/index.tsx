import React from 'react';
import { ListItems } from './styles';
import { ItemPedido } from '../../../../data';
import { ItemCart } from '../ItemCart';
import { Box, Typography } from '@mui/material';
import { theme } from '../../../../styles/theme';
import BoxOpen from '../../../../assets/box-open.svg?react';

interface ItemCartListProps {
    itens: ItemPedido[];
    totalPedido: number;
    onUpdate: (itens : ItemPedido[]) => void;
    onChangeTotal: (newValue : number) => void;
}

export const ItemCartList: React.FC<ItemCartListProps> = ({ itens, totalPedido, onUpdate, onChangeTotal }) => {


    const handleDecrementItem = (id: number) => {
        const newList = itens.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item };
                onChangeTotal(totalPedido - updatedItem.instanciaItem.preco);

                if (updatedItem.quantidade > 1) {
                    updatedItem.quantidade -= 1;
                } else {
                    return null;
                }
                return updatedItem;
            }
            return item;
        }).filter(item => item !== null) as ItemPedido[];

        onUpdate(newList);
    };

    const handleIncrementItem = (id: number) => {
        const newList = itens.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item };
                updatedItem.quantidade += 1;
                onChangeTotal(totalPedido + updatedItem.instanciaItem.preco);
                return updatedItem;
            }
            return item;
        });

        onUpdate(newList);
    };


    return (
        <ListItems>
            {
            (itens.length == 0) ? (
                <Box style={{ width: '100%', display: 'flex' , flexDirection: 'column', alignItems: 'center', padding: '32px', gap: '16px' }}>
                    <BoxOpen style={{ height: '40px' }} />
                    <Typography variant='h6' style={{ color: theme.colors.beige[900] }}> Adicione Itens para prosseguir </Typography>
                </Box>
            ):(
                itens.map((itemPedido, index) => (
                    <ItemCart key={index} itemPedido={itemPedido} onIncrement={handleIncrementItem} onDecrement={handleDecrementItem} />
                ))
            )}

        </ListItems>
    );
};
