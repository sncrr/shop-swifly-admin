import { MenuConfigs, MenuContents, MenuCustomers, MenuDashboard, MenuInventory, MenuStore } from "../../assets/svgs/Icons";
import { MenuTransactions } from "../../assets/svgs/Icons/MenuTransactions";
import { Paths } from "../../constants";
import Category from "../../pages/Category";
import Settings from "../../pages/Configuration";
import { settingsPaths } from "../../pages/Configuration/configs";
import Dashboard from "../../pages/Dashboard";
import Product from "../../pages/Product";
import Store from "../../pages/Store";

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
    children: settingsPaths
  }
]