import React, { useMemo, useState } from "react";
import {
  Typography,
  Box,
  Collapse,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  ItemButton,
  ItemButtons,
  ItemDetail,
  Line,
  VerticalLine,
} from "./styles";
import AngleSmallDown from "../../assets/angle-small-down.svg?react";
import Start from "../../assets/start.svg?react";
import Pending from "../../assets/pending.svg?react";
import Check from "../../assets/check.svg?react";
import Cancel from "../../assets/cancel.svg?react";
import Clock from "../../assets/clock.svg?react";
import { format } from "date-fns";
import { PedidoResponseDTO } from "../../services/api/dtos/pedido-response.dto";
import { calculaTotalPedido } from "../../utils";
import { theme } from "../../styles/theme";
import { Status } from "./Status";
import { StatusItemPedido } from "../../services/api/dtos/item-pedido-response.dto";
import { useSocket } from "../../hooks/useSocket";
import { toast } from "react-toastify";
import { funcionarioQuery } from "../../services/api/funcionario";
import { useRestaurante } from "../../hooks/useRestaurante";
import { Cargo } from "../../services/api/dtos/create-funcionario.dto";

interface PedidoCardProps {
  pedido: PedidoResponseDTO;
  admin?: boolean;
}

export const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, admin }) => {
  const { restaurante } = useRestaurante();
  const { startPedido, cancelItem, finishItem, setFuncionarioResponsavel } =
    useSocket();

  const { data: funcionarios } = funcionarioQuery.params(restaurante.id).use();

  const [expanded, setExpanded] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);
  const valorTotal = calculaTotalPedido(pedido);

  const handleToggleDetails = () => {
    setExpanded(!expanded);
    setIconRotation(expanded ? 0 : 180);
  };

  const statusEl = useMemo(() => {
    if (!pedido.iniciado) {
      return (
        <Status
          variant="backlog"
          label={admin ? "Iniciar" : "Pendente"}
          icon={admin ? Start : Pending}
          onClick={
            admin
              ? async () => {
                  await startPedido(pedido.id);

                  toast.success("Pedido iniciado!");
                }
              : undefined
          }
        />
      );
    }

    if (
      pedido.itens.some((item) => item.status === StatusItemPedido.PREPARANDO)
    ) {
      return <Status variant="inProgress" label="Preparando" icon={Clock} />;
    }

    if (
      pedido.itens.every((item) => item.status === StatusItemPedido.CANCELADO)
    ) {
      return <Status variant="canceled" label="Cancelado" icon={Cancel} />;
    }

    return <Status variant="finished" label="Finalizado" icon={Check} />;
  }, [pedido]);

  const itensStatusEl = useMemo(() => {
    return pedido.itens.map((item) => {
      if (!pedido.iniciado) {
        return null;
      }

      if (item.status === StatusItemPedido.PREPARANDO) {
        return admin ? (
          <ItemButtons>
            <ItemButton variant="cancel" onClick={() => cancelItem(item.id)}>
              <Cancel />
            </ItemButton>
            <ItemButton variant="confirm" onClick={() => finishItem(item.id)}>
              <Check />
            </ItemButton>
          </ItemButtons>
        ) : (
          <Status variant="inProgress" label="Preparando" icon={Clock} />
        );
      }

      if (item.status === StatusItemPedido.CANCELADO) {
        return <Status variant="canceled" label="Problema" icon={Cancel} />;
      }

      return <Status variant="finished" label="Finalizado" icon={Check} />;
    });
  }, [pedido]);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Card
        sx={{ borderRadius: "24px", padding: "8px 24px", boxShadow: 3 }}
        onClick={handleToggleDetails}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography
              variant="h6"
              style={{ color: theme.colors.black[500], fontWeight: 800 }}
            >
              R$ {valorTotal.toFixed(2)}
            </Typography>
            <VerticalLine />
            <Typography
              variant="body1"
              style={{ color: theme.colors.black[300], fontWeight: 600 }}
            >
              {pedido.itens.reduce((acc, item) => acc + item.quantidade, 0)}{" "}
              ITENS
            </Typography>
            <VerticalLine />
            <Typography
              variant="body1"
              style={{ color: theme.colors.black[300], fontWeight: 600 }}
            >
              {format(pedido.dataHora, "dd/MM/yyyy HH:mm:ss")}
            </Typography>
            <FormControl>
              <InputLabel id="responsavel-label">Responsável</InputLabel>
              <Select
                labelId="responsavel-label"
                label="Responsável"
                sx={{ width: 180 }}
                onClick={(e) => e.stopPropagation()}
                defaultValue={pedido.funcionarioResponsavel?.id}
                value={pedido.funcionarioResponsavel?.id}
                onChange={(e) =>
                  setFuncionarioResponsavel(
                    pedido.id,
                    e.target.value as number
                  ).then(() =>
                    toast.success("Responsável alterado com sucesso!")
                  )
                }
              >
                {funcionarios
                  ?.filter((item) => item.cargo === Cargo.GARCOM)
                  ?.map((funcionario) => (
                    <MenuItem value={funcionario.id}>
                      {funcionario.usuario.nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {statusEl}
            <IconButton
              onClick={handleToggleDetails}
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
          </Box>
        </CardContent>
      </Card>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card sx={{ borderRadius: "24px", boxShadow: 3 }}>
          {pedido.itens.map((itemPedido, itemIndex) => (
            <React.Fragment key={itemPedido.id}>
              <ItemDetail>
                <Box mb={1}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ color: theme.colors.black[400] }}
                  >
                    {itemPedido.instanciaItem.item.nome}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: theme.colors.black[400] }}
                  >
                    {itemPedido.observacao}
                  </Typography>
                </Box>
                <VerticalLine />
                <Typography
                  variant="body2"
                  align="right"
                  style={{ color: theme.colors.black[400] }}
                >
                  {itemPedido.quantidade}{" "}
                  {itemPedido.quantidade > 1 ? "PORÇÕES" : "PORÇÃO"}
                </Typography>
                {itensStatusEl[itemIndex]}
              </ItemDetail>
              {pedido.itens.length != itemIndex + 1 && <Line />}
            </React.Fragment>
          ))}
        </Card>
      </Collapse>
    </Box>
  );
};
