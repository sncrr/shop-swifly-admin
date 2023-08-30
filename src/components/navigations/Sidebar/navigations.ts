import { BarChart, Box2, Coin, Shop } from "../../../assets/svgs";
import { Paths } from "../../../constants";

export const navigations = [
  {
    label: "Dashboard",
    icon: BarChart,
    path: Paths.DASHBOARD,
  },
  {
    label: "Inventory",
    icon: Box2,
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
    label: "Profit",
    icon: Coin,
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
    icon: Shop,
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
  }
]