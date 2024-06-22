import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRestaurante } from "./pages/CreateRestaurante";
import { Cliente } from "./pages/Cliente";
import { HomeRestaurants } from "./pages/HomeRestaurants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/criar-restaurante",
    element: <CreateRestaurante />,
  },
  {
    path: "/cliente",
    element: <Cliente />,
  },
  {
    path: "/restaurantes",
    element: <HomeRestaurants />,
  }
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
