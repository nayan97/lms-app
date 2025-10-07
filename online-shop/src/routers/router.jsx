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
import ComingSoon from "../pages/page/ComingSoon";
import OrderHistory from "../pages/page/OrderHistory";
import Withdrawl from "../pages/page/Withdrawl";
import AddBalance from "../pages/page/AddBalance";
import TransactionHistory from './../pages/page/TransactionHistory';
import CategoryPageAll from "../pages/page/CategoryPageAll";
import ProfilePage from "../pages/page/ProfilePage";
import ProfileEditPage from "../pages/page/ProfileEditPage";
import ForgetPasswordPage from "../pages/Auth/ForgetPassaword";


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
        path: "forget-password",
        Component: ForgetPasswordPage,
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
        path: "comingsoon",
        Component: ComingSoon
      },
      {
        path:"categories",
        element: <CategoryPageAll></CategoryPageAll>
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
        path: "profilepage",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
      {
        path: "profileEditPage",
        element: (
          <PrivateRoute>
            <ProfileEditPage></ProfileEditPage>
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
        path: "order-history",
        element: (
          <PrivateRoute>
           <OrderHistory></OrderHistory>
          </PrivateRoute>
        ),
      },
            {
        path: "transaction-history",
        element: (
          <PrivateRoute>
           <TransactionHistory></TransactionHistory>
          </PrivateRoute>
        ),
      },
            {
        path: "add-balance",
        element: (
          <PrivateRoute>
           <AddBalance></AddBalance>
          </PrivateRoute>
        ),
      },
            {
        path: "withdrawl",
        element: (
          <PrivateRoute>
           <Withdrawl></Withdrawl>
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
