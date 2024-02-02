import {
  MenuConfigs,
  MenuContents,
  MenuCustomers,
  MenuDashboard,
  MenuInventory,
  MenuStore,
} from "../../assets/svgs/Icons";
import { MenuTransactions } from "../../assets/svgs/Icons/MenuTransactions";
import { Paths } from "../../constants";
import { SettingRoutes } from "../Settings";

export const sidebarNavigations = [
  {
    label: "Dashboard",
    icon: MenuDashboard,
    path: Paths.DASHBOARD,
  },
  {
    label: "Inventory",
    icon: MenuInventory,
    children: [
      {
        label: "Categories",
        path: Paths.CATEGORY,
      },
      {
        label: "Products",
        path: Paths.PRODUCT,
      },
    ],
  },
  {
    label: "Customers",
    icon: MenuCustomers,
    children: [],
  },
  {
    label: "Transactions",
    icon: MenuTransactions,
    children: [
      {
        label: "Orders",
        path: Paths.INVOICES,
      },
      {
        label: "Invoices",
        path: Paths.ORDERS,
      },
      {
        label: "Payment Methods",
        path: Paths.PAYMENT_METHOD,
      },
    ],
  },
  {
    label: "Store",
    icon: MenuStore,
    children: [
      {
        label: "Stores",
        path: Paths.STORE,
      },
      {
        label: "Delivery",
        path: Paths.DELIVERY,
      },
      {
        label: "Pick Up",
        path: Paths.PICK_UP,
      },
    ],
  },
  {
    label: "Contents",
    icon: MenuContents,
    children: [],
  },
  {
    label: "Settings",
    icon: MenuConfigs,
    path: Paths.SETTINGS,
    children: SettingRoutes,
  },
];
