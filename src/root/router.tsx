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
import { Customer, CustomerRoutes } from "../pages/Customer";
import { CustomerGroup, CustomerGroupRoutes } from "../pages/CustomerGroup";
import { Province, ProvinceRoutes } from "../pages/Address/Province";
import { City, CityRoutes } from "../pages/Address/City";
import { Barangay, BarangayRoutes } from "../pages/Address/Barangay";

export const router = createHashRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        path: Paths.ADMIN,
        element: <Admin />,
        children: [
          {
            path: Paths.DASHBOARD,
            element: <Dashboard />,
          },

          // Inventory
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

          // Customers
          {
            path: Paths.CUSTOMER,
            element: <Customer />,
            children: CustomerRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          {
            path: Paths.CUSTOMER_GROUP,
            element: <CustomerGroup />,
            children: CustomerGroupRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          // Address
          {
            path: Paths.PROVINCES,
            element: <Province />,
            children: ProvinceRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          {
            path: Paths.CITIES_MUNICIPALITIES,
            element: <City />,
            children: CityRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },
          {
            path: Paths.BARANGAYS,
            element: <Barangay />,
            children: BarangayRoutes.map((item) => ({
              path: item.path,
              element: <item.element />,
            })),
          },

          //Stores
          {
            path: Paths.STORE,
            element: <Store />,
            children: StoreRoutes.map((item) => ({
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
      // {
      //   path: "*",
      //   element: <Navigate to="/not-found" />,
      // },
    ],
  },
]);
