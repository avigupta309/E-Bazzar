import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CartSection from "./CartSection";
import {  useState } from "react";

export default function Router() {
  const[cartData,setCartData]=useState([])
  const[deleting,setDeleting]=useState()
  
  const allRoutes = createBrowserRouter([
    {
      path: "/",
      element: <App setCartData={setCartData} deleting={deleting} />,
    },
    {
      path:"cart",
      element:<CartSection cartData={cartData} setDeleting={setDeleting} />
    }
  ]);
  return (
    <>
      <RouterProvider router={allRoutes} />
    </>
  );
}
