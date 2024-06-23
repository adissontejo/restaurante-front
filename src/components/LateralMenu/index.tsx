import { Card, CardMedia } from "@mui/material";
import { LeftPanel } from "../LeftPanel";
import { Menu } from "./styles";
import { theme } from "../../styles/theme";
import { useRestaurante } from "../../hooks/useRestaurante";
import { itemsMenu, itemsMenuAdmin } from "./constants";
import { MenuItem } from "./MenuItem";
import { Fragment } from "react/jsx-runtime";
import { useAuth } from "../../hooks/useAuth";

export interface LateralMenuProps {
  admin?: boolean;
}

export const LateralMenu = ({ admin }: LateralMenuProps) => {
  const { restaurante } = useRestaurante();
  const { usuario } = useAuth();

  const itens = admin ? itemsMenuAdmin : itemsMenu;

  return (
    <LeftPanel>
      <Menu>
        <Card
          sx={{
            borderRadius: "100px",
            height: "90px",
            width: "90px",
            border: `4px solid ${theme.colors.white}`,
          }}
        >
          <CardMedia
            component="img"
            alt="Logo do Restaurante"
            image={restaurante.logoUrl || ""}
            title="Logo do Restaurante"
            sx={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </Card>
        {itens.map(({ icon, path }, index) => (
          <Fragment key={index}>
            {usuario || path !== "conta" ? (
              <MenuItem key={index} icon={icon} path={path} admin={admin} />
            ) : null}
          </Fragment>
        ))}
      </Menu>
    </LeftPanel>
  );
};
