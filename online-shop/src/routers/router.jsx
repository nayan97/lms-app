import { createBrowserRouter } from "react-router";
import Spinner from "../components/Spinner";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/register";
import Login from "../pages/Auth/login";
import Body from "../pages/Admin/Body";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import CategoryPage from "../pages/Admin/Category/CategoryPage";
import ProductSizePage from "../pages/Admin/ProductSize/ProductSizePage";
import AddColorPage from "../pages/Admin/AddColor/AddColorPage";
import ProductsPage from "../pages/Admin/ProductsPage/ProductsPage";
import Shop from "../pages/page/Shop";
import ProductDetailPage from "../pages/Admin/ProductdetailPage/ProductDetailPage";
import ProductDetails from "../pages/page/ProductDetails";
import ShoppingCart from "../pages/page/ShoppingCart";
import Checkout from "../pages/page/Checkout";
import Wishlist from "../pages/page/Wishlist";

export const router = createBrowserRouter([
  {
    Component: Layout,
    hydrateFallbackElement: <Spinner></Spinner>,
    errorElement: <>error</>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "shop",
        Component: Shop,
      },
      {
        path: "/shop/:id",
        Component: ProductDetails,
      },
      {
        path: "my-cart",
        element: (
          <PrivateRoute>
            <ShoppingCart />
          </PrivateRoute>
        ),
      },
            {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
            {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Body,
      },

      {
        path: "add-size",
        Component: ProductSizePage,
      },
      {
        path: "add-color",
        Component: AddColorPage,
      },
      {
        path: "add-category",
        Component: CategoryPage,
      },
      {
        path: "add-product",
        Component: ProductsPage,
      },
      {
        path: "add-product-detail",
        Component: ProductDetailPage,
      },
    ],
  },
]);
