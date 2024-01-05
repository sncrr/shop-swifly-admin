import { DEFAULT_ITEMS_COUNT } from '../../root/global-constant';
import { Product } from '../../types/Inventory/Product';
import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

export interface ProductState {
    loading: boolean,
    products: Product[],
    itemsCount: number,
    selectedPage: number,
    totalPages: number,
    selected: Product
    data: any,
    error: any
}

const initialState = {
    loading: true,
    products: [],
    itemsCount: DEFAULT_ITEMS_COUNT,
    selectedPage: 1,
    totalPages: 0,
    selected: null,
    data: null,
    error: null,
};

const productReducer = (history:any) => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {
        case constant.FETCH_PRODUCTS:
            return { 
                ...state,
                // selectedPage: action.data.page,
                // itemsCount: action.data.itemsCount,
                error: null 
            };
        case constant.FETCH_PRODUCTS_SUCCESS:
            return { 
                ...state,
                loading: false,
                products: action.data.data,
                itemsCount: action.data.itemsCount,
                selectedPage: action.data.currentPage,
                totalPages: action.data.totalPages
            };
        case constant.FETCH_PRODUCTS_FAILED:
            return { 
                ...state,
                error: action.error 
            };
        
        case constant.SELECT_PRODUCT:
            return {
                ...state,
                selected: action.data
            }

        default:
            return state;
    }
};

export default productReducer;