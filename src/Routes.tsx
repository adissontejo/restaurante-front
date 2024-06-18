import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateRestaurante } from "./pages/CreateRestaurante";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/criar-restaurante",
    element: <CreateRestaurante />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
