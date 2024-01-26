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