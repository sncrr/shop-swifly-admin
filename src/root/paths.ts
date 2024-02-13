import {
  MenuConfigs,
  MenuContents,
  MenuCustomers,
  MenuDashboard,
  MenuInventory,
  MenuStore,
} from "../assets/svgs/Icons";
import { MenuTransactions } from "../assets/svgs/Icons/MenuTransactions";
import { Paths } from "../constants";
import { SettingRoutes } from "../pages/Settings";

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
      {
        label: "Promotions",
        path: Paths.PROMOTION,
      },
    ],
  },
  {
    label: "Customers",
    icon: MenuCustomers,
    children: [
      {
        label: "Customers",
        path: Paths.CUSTOMER,
      },
      {
        label: "Customer Group",
        path: Paths.CUSTOMER_GROUP,
      },
      {
        label: "Provinces",
        path: Paths.PROVINCES,
        group: "Address",
      },
      {
        label: "Cities/Municipalities",
        path: Paths.CITIES_MUNICIPALITIES,
        group: "Address",
      },
      {
        label: "Barangays",
        path: Paths.BARANGAYS,
        group: "Address",
      }
    ],
  },
  {
    label: "Transactions",
    icon: MenuTransactions,
    children: [
      {
        label: "Orders",
        path: Paths.ORDERS,
      },
      {
        label: "Invoices",
        path: Paths.INVOICES,
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
