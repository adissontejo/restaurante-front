import { Card, CardActionArea, CardMedia } from "@mui/material";
import { LeftPanel } from "../LeftPanel";
import { Fragment } from "react/jsx-runtime";
import { Menu, ItemMenu } from "./styles";
import { theme } from "../../styles/theme";
import { useState } from "react";

export interface LateralMenuProps {
    items: {
        icon: React.ElementType;
    }[];

    logoUrl: string;
    handleClick : (index : number) => void;
  }

export const LateralMenu = ({ items, logoUrl, handleClick }: LateralMenuProps) => {

    const [activeItem, setActiveItem] = useState(0);

    const handleClickItemMenu = (index : number) => {
        handleClick(index);
        setActiveItem(index);
    };

    return (
        <LeftPanel>
            <Menu>
              <Card
              sx={{ borderRadius: '100px', height: '90px', width: '90px', border: `4px solid ${theme.colors.white}`}}>
                  <CardMedia
                      component="img"
                      alt="Logo do Restaurante"
                      image={logoUrl}
                      title="Logo do Restaurante"
                  />
              </Card>
              {items.map(({ icon: Icon }, index) => (
                <CardActionArea  onClick={() => handleClickItemMenu(index)}>
                    <Fragment key={index}>
                        <ItemMenu active={activeItem === index}>
                            <Icon style={{ color: theme.colors.white }} />
                        </ItemMenu>
                    </Fragment>
                </CardActionArea>
              ))}
            </Menu>
        </LeftPanel>
    );
};
