import { Paths } from "../../constants"
import General from "./General";
import Currency from "./General/Currency";
import Web from "./General/Web";
import Inventory from "./Inventory";
import Cart from "./Inventory/Cart";
import Sales from "./Sales";
import { payments } from "./payments";

const basePath = Paths.SETTINGS;

export const SettingRoutes = [
    {
        label: 'General',
        path: `${basePath}/general`,
        code: 'general',
        element: General,
        children: [
            {
                label: 'Web',
                code: 'web',
                element: Web
            },
            {
                label: 'Currency',
                code: 'currency',
                element: Currency
            }
        ]
    },
    {
        label: 'Inventory',
        path: `${basePath}/inventory`,
        code: 'inventory',
        element: Inventory,
        children: [
            {
                label: 'Cart',
                code: 'cart',
                element: Cart
            }
        ]
    },
    {
        label: 'Customer',
        path: `${basePath}/customer`,
        code: 'customer',
        element: General,
        children: []
    },
    {
        label: 'Sales',
        path: `${basePath}/sales`,
        code: 'sales',
        element: Sales,
        children: [
            ...payments
        ]
    },
    {
        label: 'Security',
        path: `${basePath}/security`,
        code: 'security',
        element: General,
        children: []
    }
];