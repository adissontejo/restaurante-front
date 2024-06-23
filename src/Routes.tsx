import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRestaurante } from "./pages/CreateRestaurante";
import { RestauranteHome } from "./pages/RestauranteHome";
import { AppContainer } from "./components/AppContainer";
import { RestauranteItens } from "./pages/RestauranteItens";
import { RestauranteCarrinho } from "./pages/RestauranteCarrinho";
import { RestauranteContaMes } from "./pages/RestauranteContaMes";
import { RestauranteContaCliente } from "./pages/RestauranteContaCliente";
import { App } from "./App";
import { RestauranteProvider } from "./contexts/Restaurante";
import { SocketProvider } from "./contexts/Socket";
import { RestauranteContaPedidos } from "./pages/RestauranteContaPedidos";
import { RestaurantePedidos } from "./pages/RestaurantePedidos";
import { HomeRestaurants } from "./pages/HomeRestaurants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/restaurantes",
        element: <HomeRestaurants />,
      },
      {
        path: "/criar-restaurante",
        element: <CreateRestaurante />,
      },
      {
        path: "/restaurante/:dominio",
        element: (
          <RestauranteProvider>
            <SocketProvider>
              <AppContainer />
            </SocketProvider>
          </RestauranteProvider>
        ),
        children: [
          {
            index: true,
            element: <RestauranteHome />,
          },
          {
            path: "cardapio",
            element: <RestauranteItens />,
          },
          {
            path: "carrinho",
            element: <RestauranteCarrinho />,
          },
          {
            path: "historico",
            element: <RestauranteContaPedidos />,
            children: [
              {
                path: "conta",
                element: <RestauranteContaMes />,
              },
              {
                path: "pedidos",
                element: <RestaurantePedidos />,
              },
            ],
          },
          {
            path: "conta",
            element: <RestauranteContaCliente />,
          },
        ],
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
