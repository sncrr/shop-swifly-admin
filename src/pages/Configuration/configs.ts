import { Paths } from '../../constants';
import General from './General';
import Currency from './General/Currency';
import Web from './General/Web';
import Inventory from './Inventory';
import Cart from './Inventory/Cart';
import Sales from './Sales';
import CashOnDelivery from './Sales/CashOnDelivery';
import CreditDebit from './Sales/CreditDebit';
import Gcash from './Sales/Gcash';
import Maya from './Sales/Maya';

export const payments = [
    {
        label: 'Cash on Delivery',
        code: 'cod',
        element: CashOnDelivery
    },
    {
        label: 'GCash',
        code: 'gcash',
        element: Gcash
    },
    {
        label: 'Maya',
        code: 'maya',
        element: Maya
    },
    {
        label: 'Credit & Debit Cards',
        code: 'credit_debit',
        element: CreditDebit
    }
];

export const settingsPaths = [
    {
        label: 'General',
        path: `${Paths.SETTINGS}/general`,
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
        path: `${Paths.SETTINGS}/inventory`,
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
        path: `${Paths.SETTINGS}/customer`,
        code: 'customer',
        element: General,
        children: []
    },
    {
        label: 'Sales',
        path: `${Paths.SETTINGS}/sales`,
        code: 'sales',
        element: Sales,
        children: [
            ...payments
        ]
    },
    {
        label: 'Security',
        path: `${Paths.SETTINGS}/security`,
        code: 'security',
        element: General,
        children: []
    }
];