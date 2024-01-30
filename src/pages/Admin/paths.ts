import { MenuConfigs, MenuContents, MenuCustomers, MenuDashboard, MenuInventory, MenuStore } from "../../assets/svgs/Icons";
import { MenuTransactions } from "../../assets/svgs/Icons/MenuTransactions";
import { Paths } from "../../constants";
import Category from "../Category";
import Settings from "../Settings";
import Dashboard from "../Dashboard";
import Product from "../Product";
import Store from "../Store";
import { SettingRoutes } from "../Settings/routes";

export const paths = [
  {
    path: "/dashboard",
    element: Dashboard
  },
  {
    path: "/categories/*",
    element: Category
  },
  {
    path: "/products/*",
    element: Product,
  },
  {
    path: "/stores/*",
    element: Store,
  },
  {
    path: "/settings/*",
    element: Settings,
  }
];

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
        path: Paths.CATEGORY
      },
      {
        label: "Products",
        path: Paths.PRODUCT
      }
    ]
  },
  {
    label: "Customers",
    icon: MenuCustomers,
    children: []
  },
  {
    label: "Transactions",
    icon: MenuTransactions,
    children: [
      {
        label: "Orders",
        path: Paths.INVOICES
      },
      {
        label: "Invoices",
        path: Paths.ORDERS
      }
    ]
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
      }
    ]
  },
  {
    label: "Contents",
    icon: MenuContents,
    children: []
  },
  {
    label: "Settings",
    icon: MenuConfigs,
    path: Paths.SETTINGS,
    children: SettingRoutes
  }
]