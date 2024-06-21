import React, { useState } from 'react';
import { Typography, Box, Collapse, Card, CardContent, IconButton } from '@mui/material';
import { Pedido  } from '../../../../data';
import { theme } from '../../../../styles/theme';
import { ItemDetail, Line, VerticalLine } from './styles';
import AngleSmallDown from '../../../../assets/angle-small-down.svg?react';
import { calculaTotalPedido, formatDate, formatTime } from '../../../../utils';

interface OrderListItemProps {
    pedido: Pedido;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({ pedido }) => {
    const [expanded, setExpanded] = useState(false);
    const [iconRotation, setIconRotation] = useState(0);
    const valorTotal = calculaTotalPedido(pedido.items);

    const handleToggleDetails = () => {
        setExpanded(!expanded);
        setIconRotation(expanded ? 0 : 180);
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Card sx={{ borderRadius: '24px', padding: '8px 24px', boxShadow: 3}} onClick={handleToggleDetails}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <Typography variant="h6" style={{ color: theme.colors.black[500], fontWeight: 800 }}>
                            R$ {valorTotal.toFixed(2)}
                        </Typography>
                        <VerticalLine />
                        <Typography variant="body1" style={{ color: theme.colors.black[300], fontWeight: 600 }}>{pedido.items.reduce((acc, item) => acc + item.quantidade, 0)} ITENS</Typography>
                        <VerticalLine />
                        <Typography variant="body1" style={{ color: theme.colors.black[300], fontWeight: 600 }}>{formatDate(pedido.dataHora)} - {formatTime(pedido.dataHora)}</Typography>
                        <IconButton onClick={handleToggleDetails} style={{ background : theme.colors.beige[700], height: '100%' }}>
                            <AngleSmallDown style={{ color: theme.colors.white[500], height: '20px', width: '20px', transform: `rotate(${iconRotation}deg)` }} />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Card sx={{ borderRadius: '24px', boxShadow: 3 }}>
                    {pedido.items.map((itemPedido, itemIndex) => (
                    <React.Fragment key={itemPedido.id}>
                        <ItemDetail>
                            <Box mb={1} >
                                <Typography variant="body1" fontWeight="bold" style={{ color: theme.colors.black[400] }}>{itemPedido.instanciaItem.item.nome}</Typography>
                                <Typography variant="body2" style={{ color: theme.colors.black[400] }}>{itemPedido.observacao}</Typography>
                            </Box>
                            <VerticalLine />
                            <Typography variant="body2" align="right" style={{ color: theme.colors.black[400] }}>{itemPedido.quantidade} {itemPedido.quantidade > 1 ? 'PORÇÕES' : 'PORÇÃO'}</Typography>
                        </ItemDetail>
                        {pedido.items.length != (itemIndex + 1) && <Line />}
                    </React.Fragment>
                    ))}
                </Card>
            </Collapse>
        </Box>
    );
};
