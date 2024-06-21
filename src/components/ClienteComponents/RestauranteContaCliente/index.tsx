import { TitleWithUnderline } from "../../TitleWithUnderline";
import { Usuario } from "../../../data";
import { UsuarioFormEdit } from "./UsuarioFormEdit";

interface RestauranteContaClienteProps {
    usuario: Usuario;
}

export const RestauranteContaCliente: React.FC<RestauranteContaClienteProps> = ({ usuario }) => {

    return (
        <>
            <TitleWithUnderline text="Dados da Conta" />
            <UsuarioFormEdit usuario={usuario} />
        </>
    );
};
