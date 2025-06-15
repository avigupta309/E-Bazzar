import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CartSection from "./CartSection";

export default function Router() {
  const allRoutes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "cart",
      element: <CartSection />,
    },
  ]);
  return (
    <>
      <RouterProvider router={allRoutes} />
    </>
  );
}
