import { Container, Body } from "./styles";
import { itemsMenu } from "./contants";
import { LateralMenu } from "../LateralMenu";
import {
  Usuario,
  restaurante,
  usuarios,
  ItemPedido,
  itemPedidos,
} from "../../data";
import { ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const AppContainer = ({ children }: { children?: ReactNode }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [itensCarrinho, setItensCarrinho] = useState(Array<ItemPedido>);

  const handleClickItemMenu = (index: number) => {
    setActiveItem(index);
  };

  const usuario: Usuario = usuarios.filter((usuario) => usuario.id === 3)[0];

  useEffect(() => {
    setItensCarrinho([itemPedidos[0], itemPedidos[1], itemPedidos[2]]);
  }, []);

  const handleAlterCart = (itens: ItemPedido[]) => {
    setItensCarrinho(itens);
  };

  return (
    <Container>
      <LateralMenu
        items={itemsMenu}
        logoUrl={restaurante.logoUrl ? restaurante.logoUrl : ""}
        handleClick={handleClickItemMenu}
      />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};
