import { Navigate, Outlet, createHashRouter } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Login } from "../pages/Login";
import { Admin } from "../pages/Admin";
import { Paths } from "../constants";
import { Dashboard } from "../pages/Dashboard";
import { Category, CategoryRoutes } from "../pages/Category";
import { Product, ProductRoutes } from "../pages/Product";
import { SettingRoutes, Settings } from "../pages/Settings";
import { Store, StoreRoutes } from "../pages/Store";
import { PaymentMethod, PaymentMethodRoutes } from "../pages/PaymentMethods";

export const router = createHashRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: Paths.ADMIN,
        element: <Admin />,
        children: [
          {
            path: Paths.DASHBOARD,
            element: <Dashboard />,
          },

          {
            path: Paths.CATEGORY,
            element: <Category />,
            children: CategoryRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          {
            path: Paths.PRODUCT,
            element: <Product />,
            children: ProductRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },

          {
            path: Paths.PAYMENT_METHOD,
            element: <PaymentMethod />,
            children: PaymentMethodRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          

          {
            path: Paths.STORE,
            element: <Store />,
            children: StoreRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          {
            path: Paths.SETTINGS,
            element: <Settings />,
            children: SettingRoutes.map((item) => ({
              path: item.path,
              element: (
                <item.element children={item.children} section={item.code} />
              ),
            })),
          },

          //Redirects
          {
            path: "/admin/",
            element: <Navigate to="/admin/dashboard" />,
          },
        ],
      },
      {
        path: Paths.LOGIN,
        element: <Login />,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },

      //Redirects
      {
        path: "/",
        element: <Navigate to="/admin" />,
      },
      {
        path: "*",
        element: <Navigate to="/not-found" />,
      },
    ],
  },
]);
