import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Typography,
} from "@mui/material";
import {
  Button,
  ButtonLabel,
  Buttons,
  CardItemDiv,
  CardWrapper,
  IconContainer,
  IconDiv,
} from "./styles";
import React, { useState } from "react";
import Plus from "../../../assets/plus.svg?react";
import Pencil from "../../../assets/pencil.svg?react";
import { DialogAddItem } from "../DialogAddItem";
import { theme } from "../../../styles/theme";
import { DialogItemForm } from "../DialogItemForm";
import { ItemResponseDTO } from "../../../services/api/dtos/item-response.dto";

interface CardItemProps {
  item: ItemResponseDTO;
  admin?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({ item, admin }) => {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleToogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <CardItemDiv>
        <CardWrapper
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card
            variant="elevation"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "24px",
            }}
          >
            <CardMedia
              component="img"
              image={item.fotoUrl || ""}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <IconContainer
              style={{ opacity: hovered ? 1 : 0 }}
              onClick={admin ? undefined : handleToogleModal}
            >
              {admin ? (
                <Buttons>
                  <Button variant="regular" onClick={() => setEditOpen(true)}>
                    <Pencil />
                    <ButtonLabel>Editar</ButtonLabel>
                  </Button>
                </Buttons>
              ) : (
                <IconDiv>
                  <Plus height={25} width={25} />
                </IconDiv>
              )}
            </IconContainer>
          </Card>
        </CardWrapper>
        <CardContent style={{ padding: 0 }}>
          <Typography
            variant="h5"
            component="div"
            color={theme.colors.black[600]}
            fontWeight={800}
          >
            {item.nome}
          </Typography>
          <Typography variant="body1" color={theme.colors.black[400]}>
            {" "}
            R$ {item.instanciaAtiva.preco}{" "}
          </Typography>
        </CardContent>
      </CardItemDiv>

      <Dialog open={showModal}>
        <DialogAddItem item={item} handleClose={handleToogleModal} />
      </Dialog>
      <Dialog open={editOpen}>
        <DialogItemForm item={item} handleClose={() => setEditOpen(false)} />
      </Dialog>
    </>
  );
};
