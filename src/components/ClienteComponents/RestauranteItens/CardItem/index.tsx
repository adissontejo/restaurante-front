import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { InstanciaItem } from "../../../../data";
import { CardItemDiv, CardWrapper, IconContainer, IconDiv } from "./styles";
import React, { useState } from "react";
import { theme } from "../../../../styles/theme";
import Plus from "../../../../assets/plus.svg?react";
import { DialogAddItem } from "../DialogAddItem";

interface CardItemProps {
    instanciaItem: InstanciaItem;
}

export const CardItem : React.FC<CardItemProps> = ({ instanciaItem }) => {
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleToogleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <CardItemDiv>
                <CardWrapper
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <Card variant="elevation" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '24px' }}>
                        <CardMedia component="img"
                                image={instanciaItem.item.urlImagem}
                                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            />
                            <IconContainer style={{ opacity: hovered ? 1 : 0 }} onClick={handleToogleModal}>
                                <IconDiv>
                                    <Plus height={25} width={25} />
                                </IconDiv>
                            </IconContainer>
                    </Card>
                </CardWrapper>
                <CardContent style={{ padding: 0 }}>
                    <Typography variant="h5" component="div" color={theme.colors.black[600]} fontWeight={800}>
                        {instanciaItem.item.nome}
                    </Typography>
                    <Typography variant="body1" color={theme.colors.black[400]}> R$ {instanciaItem.preco} </Typography>
                </CardContent>
            </CardItemDiv>

            <DialogAddItem instanciaItem={instanciaItem} handleClose={handleToogleModal} open={showModal} />
        </>
    );
};
