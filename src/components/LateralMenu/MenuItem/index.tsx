import { CardActionArea } from "@mui/material";
import { FC, SVGProps, useMemo } from "react";
import { useRestaurante } from "../../../hooks/useRestaurante";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Container } from "./styles";
import { theme } from "../../../styles/theme";

export interface MenuItemProps {
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const MenuItem = ({ path, icon: Icon }: MenuItemProps) => {
  const { restaurante } = useRestaurante();
  const { pathname } = useLocation();
  const { dominio } = useParams();
  const navigate = useNavigate();

  const isActive = useMemo(() => {
    const base = pathname.split(/(\/\?|\?)/)[0];

    if (path === "") {
      return (
        base === `/restaurante/${dominio}` || base === `restaurante/${dominio}/`
      );
    }

    return (
      base === `/restaurante/${dominio}/${path}` ||
      base === `/restaurante/${dominio}/${path}/`
    );
  }, [dominio, pathname]);

  return (
    <CardActionArea
      onClick={() => navigate(`/restaurante/${restaurante.dominio}/${path}`)}
    >
      <Container active={isActive}>
        <Icon style={{ color: theme.colors.white[500] }} />
      </Container>
    </CardActionArea>
  );
};
