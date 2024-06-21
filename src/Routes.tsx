import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRestaurante } from "./pages/CreateRestaurante";
import { Cliente } from "./pages/Cliente";

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
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
