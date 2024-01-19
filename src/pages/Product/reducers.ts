import { Product } from '../../types/Inventory/Product';
import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

export interface ProductState {
    loading: boolean,
    products: Product[],
    totalPages: number
}

const initialState = {
    loading: true,
    products: [],
    totalPages: 1
};

const productReducer = (history:any) => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {

        case constant.FETCH_PRODUCTS:
            return { 
                ...state,
                loading: true,
                error: null 
            };
        case constant.FETCH_PRODUCTS_SUCCESS:
            return { 
                ...state,
                loading: false,
                products: action.data.data,
                totalPages: action.data.totalPages
            };
        case constant.FETCH_PRODUCTS_FAILED:
            return { 
                ...state,
                loading: false,
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