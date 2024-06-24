import React, { useMemo, useState } from "react";
import { Typography, IconButton, Box, Collapse } from "@mui/material";
import { CountButton, ItemContainer, ItemImage, BoxNumber } from "./styles";
import Plus from "../../../assets/plus.svg?react";
import Minus from "../../../assets/minus.svg?react";
import AngleSmallDown from "../../../assets/angle-small-down.svg?react";
import { theme } from "../../../styles/theme";
import { useRestaurante } from "../../../hooks/useRestaurante";

interface ItemCartProps {
  index: number;
}

export const ItemCart: React.FC<ItemCartProps> = ({ index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);

  const { itensCarrinho, incrementCartItem, decrementCartItem } =
    useRestaurante();

  const item = itensCarrinho[index];

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIconRotation(showDetails ? 0 : 180);
  };

  const respostas = useMemo(() => {
    return item.respostas
      ?.filter((resposta) => resposta.opcoesIds?.length || resposta.resposta)
      .map((resposta) => {
        const campo = item.campos?.find(
          (campo) => campo.id === resposta.campoFormularioId
        );

        if (resposta.resposta) {
          return `${campo?.nome}: ${resposta.resposta}`;
        }

        return resposta.opcoesIds
          ?.map((opcaoId) => {
            const opcao = campo?.opcoes?.find((opcao) => opcao.id === opcaoId);

            return `${campo?.nome}: ${opcao?.texto}`;
          })
          .join(", ");
      });
  }, [item]);

  return (
    <>
      <ItemContainer>
        <Box sx={{ width: "60%", display: "flex", gap: "8px" }}>
          <ItemImage src={item.fotoUrl || ""} alt={item.nome} />
          <Box>
            <Typography
              variant="h6"
              sx={{ color: theme.colors.black[600], fontWeight: 800 }}
            >
              {item.nome}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.colors.black[400], fontWeight: 500 }}
            >
              R$ {item.instanciaAtiva.preco} x {item.quantidade} = R${" "}
              {item.quantidade * item.instanciaAtiva.preco}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <CountButton onClick={() => decrementCartItem(index)}>
            <Minus
              style={{
                color: theme.colors.black[500],
                height: "16px",
                marginRight: "8px",
              }}
            />
          </CountButton>
          <BoxNumber>
            <Typography
              variant="body2"
              sx={{ mx: 2, color: theme.colors.black[500], fontWeight: 800 }}
            >
              {item.quantidade}
            </Typography>
          </BoxNumber>
          <CountButton onClick={() => incrementCartItem(index)}>
            <Plus style={{ color: theme.colors.black[500], height: "16px" }} />
          </CountButton>
        </Box>
        <IconButton
          onClick={() => toggleDetails()}
          style={{ background: theme.colors.beige[700], height: "100%" }}
        >
          <AngleSmallDown
            style={{
              color: theme.colors.white[500],
              height: "20px",
              width: "20px",
              transform: `rotate(${iconRotation}deg)`,
            }}
          />
        </IconButton>
      </ItemContainer>
      <Collapse
        in={showDetails}
        timeout="auto"
        unmountOnExit
        style={{ padding: "0px 16px" }}
      >
        {item.observacao?.length ? (
          <Typography
            variant="body2"
            style={{
              color: theme.colors.black[400],
              borderTop: "1px solid " + theme.colors.beige[600],
              padding: "8px 0",
            }}
          >
            Observação: {item.observacao}
          </Typography>
        ) : null}
        {respostas?.length ? (
          <Typography
            variant="body2"
            style={{
              color: theme.colors.black[400],
              borderTop: "1px solid " + theme.colors.beige[600],
              padding: "8px 0",
            }}
          >
            {respostas}
          </Typography>
        ) : null}
      </Collapse>
    </>
  );
};
