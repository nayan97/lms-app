import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/register";
import Login from "../pages/Auth/login";
import Body from "../pages/Admin/Body";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";




export const router = createBrowserRouter([
  {
    Component: Layout,
    hydrateFallbackElement: <p>Loding........</p>,
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
 
    ],
  },
 
]);
