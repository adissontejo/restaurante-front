import { Card, CardMedia } from "@mui/material";
import { LeftPanel } from "../LeftPanel";
import { Menu } from "./styles";
import { theme } from "../../styles/theme";
import { useRestaurante } from "../../hooks/useRestaurante";
import { itemsMenu } from "./constants";
import { MenuItem } from "./MenuItem";

export const LateralMenu = () => {
  const { restaurante } = useRestaurante();

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
          />
        </Card>
        {itemsMenu.map(({ icon, path }, index) => (
          <MenuItem key={index} icon={icon} path={path} />
        ))}
      </Menu>
    </LeftPanel>
  );
};
