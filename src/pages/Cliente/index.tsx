import { Container, Body } from "./styles";
import { itemsMenu } from "./contants";
import { LateralMenu } from "../../components/LateralMenu";
import { Usuario, restaurante, usuarios, ItemPedido, itemPedidos } from "../../data";
import { useEffect, useState } from "react";
import { RestauranteInfo } from "../../components/ClienteComponents/RestauranteInfo";
import { RestauranteItens } from "../../components/ClienteComponents/RestauranteItens";
import { RestauranteCarrinho } from "../../components/ClienteComponents/RestauranteCarrinho";
import { RestauranteContaMes } from "../../components/ClienteComponents/RestauranteContaMes";
import { RestauranteContaCliente } from "../../components/ClienteComponents/RestauranteContaCliente";


export const Cliente = () => {

    const [activeItem, setActiveItem] = useState(0);
    const [itensCarrinho, setItensCarrinho] = useState(Array<ItemPedido>);

    const handleClickItemMenu = (index : number) => {
        setActiveItem(index);
    };

    const usuario : Usuario = usuarios.filter((usuario) => usuario.id === 3)[0];

    useEffect(() => {
        setItensCarrinho([itemPedidos[0], itemPedidos[1], itemPedidos[2]]);
    }, []);

    const handleAlterCart = (itens : ItemPedido[]) => {
        setItensCarrinho(itens);
    }

    return (
      <Container>
        <LateralMenu items={itemsMenu} logoUrl={restaurante.logoUrl ? restaurante.logoUrl : ''} handleClick={handleClickItemMenu} />
        <Body>
            {activeItem === 0 && <RestauranteInfo restaurante={restaurante} />}
            {activeItem === 1 && <RestauranteItens idRestaurante={restaurante.id} />}
            {activeItem === 2 && <RestauranteCarrinho items={itensCarrinho} onAlter={(itens) => handleAlterCart(itens) } />}
            {activeItem === 3 && <RestauranteContaMes usuario={usuario} />}
            {activeItem === 4 && <RestauranteContaCliente usuario={usuario} />}
        </Body>
      </Container>
    );
  };
