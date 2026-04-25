import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";
import Artistry from "../features/products/pages/Artistry";
import ProductDetail from "../features/products/pages/ProductDetail";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },

  {
    path:"/artistry",
    element:<Artistry/>
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path:"/seller",
    children:[
      {
    path:"/seller/create-product",
    element:<Protected role="seller"><CreateProduct/></Protected>
  },
  {
    path:"/seller/dashboard",
    element:<Protected role="seller"><Dashboard/></Protected>
  }
    ]
  }
]) 