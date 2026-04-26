import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";
import Artistry from "../features/products/pages/Artistry";
import ProductDetail from "../features/products/pages/ProductDetail";
import SellerProductDetails from "../features/products/pages/SellerProductDetails";
import Experience from "../features/common/pages/Experience";
import Concierge from "../features/common/pages/Concierge";

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
    path:"/experience",
    element:<Experience/>
  },
  {
    path:"/concierge",
    element:<Concierge/>
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path:"/seller",
    children:[
      {
        path:"/seller/product/:productId",
        element:<Protected role="seller"><SellerProductDetails/></Protected>
      },
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