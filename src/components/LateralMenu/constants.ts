import Home from "../../assets/home.svg?react";
import Restaurant from "../../assets/restaurant.svg?react";
import ShoppingChartCheck from "../../assets/shopping-cart-check.svg?react";
import CalculatorBill from "../../assets/calculator-bill.svg?react";
import UserManager from "../../assets/user-manager.svg?react";
import Management from "../../assets/management.svg?react";
import Visit from "../../assets/visit.svg?react";

export const itemsMenu = [
  {
    icon: Home,
    path: "",
  },
  {
    icon: Restaurant,
    path: "cardapio",
  },
  {
    icon: ShoppingChartCheck,
    path: "carrinho",
  },
  {
    icon: CalculatorBill,
    path: "pedidos",
  },
  {
    icon: UserManager,
    path: "conta",
  },
] as const;

export const itemsMenuAdmin = [
  {
    icon: Home,
    path: "",
  },
  {
    icon: Restaurant,
    path: "cardapio",
  },
  {
    icon: Management,
    path: "funcionarios",
  },
  {
    icon: Visit,
    path: "dados",
  },
  {
    icon: UserManager,
    path: "conta",
  },
] as const;
