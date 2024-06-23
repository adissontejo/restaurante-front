import { ListTabDiv } from "./styles";
import { ListTabText } from "../ListTabText";

export interface ListTabProps {
  value?: any;
  items?: {
    label: string;
    value: any;
  }[];
  onChange?: (value: any) => void;
}

export const ListTab = ({ value, items, onChange }: ListTabProps) => {
  return (
    <ListTabDiv>
      {items?.map((item) => (
        <ListTabText
          text={item.label}
          isActive={value === item.value}
          onClick={() => onChange?.(item.value)}
        />
      ))}
    </ListTabDiv>
  );
};
