import { MenuConfigs } from "../../../assets/svgs/Icons/MenuConfigs";
import { MenuContents } from "../../../assets/svgs/Icons/MenuContents";
import { MenuCustomers } from "../../../assets/svgs/Icons/MenuCustomers";
import { MenuDashboard } from "../../../assets/svgs/Icons/MenuDashboard";
import { MenuInventory } from "../../../assets/svgs/Icons/MenuInventory";
import { MenuStore } from "../../../assets/svgs/Icons/MenuStore";
import { MenuTransactions } from "../../../assets/svgs/Icons/MenuTransactions";
import { Paths } from "../../../constants";

export const navigations = [
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
    label: "Configs",
    icon: MenuConfigs,
    path: Paths.CONFIGS
  }
]