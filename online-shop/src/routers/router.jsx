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
import OneClickOrder from "../pages/page/OneClickOrder";
import Wishlist from "../pages/page/Wishlist";

import ComingSoon from "../pages/page/ComingSoon";
import OrderHistory from "../pages/page/OrderHistory";
import Withdrawl from "../pages/page/Withdrawl";
import AddBalance from "../pages/page/AddBalance";
import TransactionHistory from './../pages/page/TransactionHistory';
import CategoryPageAll from "../pages/page/CategoryPageAll";
import ProfilePage from "../pages/page/ProfilePage";
import ProfileEditPage from "../pages/page/ProfileEditPage";
import Quizjob from "../pages/page/Quizjob";
import Typingjob from "../pages/page/Typingjob";
import WalletPage from "../pages/page/WalletPage";
import AdsViewPage from "../pages/page/AdsViewPage";
import LatestProduct from "../pages/page/LatestProduct";
import PopularProduct from "../pages/page/PopularProduct";
import MyNetwork from "../pages/page/MyNetwork";
import Support from "../pages/page/Support";

import ForgetPasswordPage from "../pages/Auth/ForgetPassaword";
import VoucherBalance from "../pages/page/VoucherBalance";
import Earning from "../pages/page/Earning";
import VoucherBalanceWithdraw from "../pages/page/VoucherBalanceWithdraw";
import VoucherBalanceAdd from "../pages/page/Voucherbalanceadd";
import BalanceExchange from "../pages/page/BalanceExchange";
import ErrorPage from "../components/ErrorPage";
import AdsMarketing from "../pages/page/AdsMarketing";
import IncomeHistory from "../pages/page/IncomeHistory";
import DriveOffer from "../pages/page/DriveOffer";
import AllOrders from "../pages/Admin/AllOrder/AllOrders";


export const router = createBrowserRouter([
  {
    Component: Layout,
    hydrateFallbackElement: <Spinner></Spinner>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/support",
        Component: Support
      },
      {
        path:"categories",
        element: <CategoryPageAll></CategoryPageAll>
      },
      {
        path:"/adsmarketing",
        element: <AdsMarketing></AdsMarketing>
      },
      {
        path:"/incomehistory",
        element: <IncomeHistory></IncomeHistory>
      },
      {
        path: "/driveoffer",
        element: (
          <PrivateRoute>
            <DriveOffer></DriveOffer>
          </PrivateRoute>
        ),
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
        path: "quizjob",
        element: (
          <PrivateRoute>
            <Quizjob></Quizjob>
          </PrivateRoute>
        ),
      },
      {
        path: "adsview",
        element: (
          <PrivateRoute>
            <AdsViewPage></AdsViewPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/typing-job",
        element: (
          <PrivateRoute>
          <Typingjob></Typingjob>
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
        path: "/wallet",
        element: (
          <PrivateRoute>
            <WalletPage></WalletPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/voucherbalancewithdraw",
        element: (
          <PrivateRoute>
            <VoucherBalanceWithdraw></VoucherBalanceWithdraw>
          </PrivateRoute>
        ),
      },
      {
        path: "/voucherbalanceadd",
        element: (
          <PrivateRoute>
            <VoucherBalanceAdd></VoucherBalanceAdd>
          </PrivateRoute>
        ),
      },
      {
        path: "/balanceexchange",
        element: (
          <PrivateRoute>
            <BalanceExchange></BalanceExchange>
          </PrivateRoute>
        ),
      },
      {
        path: "/wallet/voucherbalance",
        element: (
          <PrivateRoute>
           <VoucherBalance></VoucherBalance>
          </PrivateRoute>
        ),
      },
      {
        path: "/wallet/earning",
        element: (
          <PrivateRoute>
           <Earning></Earning>
          </PrivateRoute>
        ),
      },
      {
        path: "/mynetwork",
        element: (
          <PrivateRoute>
            <MyNetwork></MyNetwork>
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
        path: "/latestproduct",
        element: (
          <PrivateRoute>
            <LatestProduct></LatestProduct>
          </PrivateRoute>
        ),
      },
            {
        path: "/popularproduct",
        element: (
          <PrivateRoute>
            <PopularProduct></PopularProduct>
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
        path: "addbalance",
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
      {
        path: "oneclickorder",
        element: (
          <PrivateRoute>
            <OneClickOrder />
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
        path: "all-order",
        Component: AllOrders,
      },
      {
        path: "add-product-detail",
        Component: ProductDetailPage,
      },
    ],
  },
]);
