import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRestaurante } from "./pages/CreateRestaurante";
import { RestauranteHome } from "./pages/RestauranteHome";
import { AppContainer } from "./components/AppContainer";
import { RestauranteItens } from "./pages/RestauranteItens";
import { RestauranteCarrinho } from "./pages/RestauranteCarrinho";
import { RestauranteContaCliente } from "./pages/RestauranteContaCliente";
import { App } from "./App";
import { RestauranteProvider } from "./contexts/Restaurante";
import { RestaurantePedidos } from "./pages/RestaurantePedidos";
import { HomeRestaurants } from "./pages/HomeRestaurants";
import { RestauranteAdminHome } from "./pages/RestauranteAdminHome";
import { EditRestaurante } from "./pages/EditRestaurante";
import { ManageCardapioRestaurante } from "./pages/ManageCardapioRestaurante";
import { Login } from "./pages/Login";


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
        path: "/login",
        element: <Login />,
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
            <Outlet />
          </RestauranteProvider>
        ),
        children: [
          {
            element: <AppContainer />,
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
                path: "pedidos",
                element: <RestaurantePedidos />,
              },
              {
                path: "conta",
                element: <RestauranteContaCliente />,
              },
            ],
          },
          {
            path: "admin",
            element: <AppContainer admin />,
            children: [
              {
                index: true,
                element: <RestauranteAdminHome />,
              },
              {
                path: "dados",
                element: <EditRestaurante />,
              },
              {
                path: "cardapio",
                element: <RestauranteItens admin />,
              },
              {
                path: "conta",
                element: <RestauranteContaCliente />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
