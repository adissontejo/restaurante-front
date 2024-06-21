import { useState } from "react";
import { ListTabDiv } from "./styles";
import { ListTabText } from "../ListTabText";

export interface ListTabProps {
    items: string[];
    handleClick : (categoria : string) => void;
  }

export const ListTab = ({ items, handleClick }: ListTabProps) => {

    const [activeItem, setActiveItem] = useState(items[0]);

    const handleToggleActive = (categoria : string) => {
        handleClick(categoria);
        setActiveItem(categoria);
    };

    return (
        <ListTabDiv>
            {items.map((item) => (
                <ListTabText text={item} isActive={activeItem === item} onClick={() => handleToggleActive(item)} />
              ))}
        </ListTabDiv>
    );
};
