import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { TitleWithUnderline } from "../../components/TitleWithUnderline";
import { ListTab } from "../../components/ListTab";

export const RestauranteContaPedidos = () => {
  const { dominio } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = pathname
    .replace(`/restaurante/${dominio}/historico/`, "")
    .replace(/[^A-Za-z]/g, "");

  return (
    <>
      <TitleWithUnderline text="Histórico" />
      <ListTab
        items={[
          { label: "Conta", value: "conta" },
          { label: "Pedidos", value: "pedidos" },
        ]}
        value={active}
        onChange={(value) =>
          navigate(`/restaurante/${dominio}/historico/${value}`)
        }
      />
      <Outlet />
    </>
  );
};
