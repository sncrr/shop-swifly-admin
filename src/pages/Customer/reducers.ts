import { DEFAULT_ITEMS_COUNT } from '../../constants/global';
import { Customer } from '../../types/Customer/Customer';
import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

export interface CustomerState {
    loading: boolean,
    customers: Customer[],
    itemsCount: number,
    selectedPage: number,
    totalPages: number,
    selected: Customer
    data: any,
    error: any
}

const initialState = {
    loading: true,
    customers: [],
    itemsCount: DEFAULT_ITEMS_COUNT,
    selectedPage: 1,
    totalPages: 0,
    selected: null,
    data: null,
    error: null
};

const customersReducer = () => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {
        case constant.FETCH_CUSTOMERS:
            return { 
                ...state,
                // selectedPage: action.data.page,
                // itemsCount: action.data.itemsCount,
                error: null 
            };
        case constant.FETCH_CUSTOMERS_SUCCESS:
            return { 
                ...state,
                loading: false,
                customers: action.data.data,
                itemsCount: action.data.itemsCount,
                selectedPage: action.data.currentPage,
                totalPages: action.data.totalPages
            };
        case constant.FETCH_CUSTOMERS_FAILED:
            return { 
                ...state,
                error: action.error 
            };
        
        case constant.SELECT_CUSTOMER:
            return {
                ...state,
                selected: action.data
            }

        default:
            return state;
    }
};

export default customersReducer;