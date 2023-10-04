import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

const initialState = {
    products: [],
    selected: null,
    data: null,
    error: null,
};

const productReducer = (history:any) => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {
        case constant.FETCH_PRODUCTS:
            return { 
                ...state,
                error: null 
            };
        case constant.FETCH_PRODUCTS_SUCCESS:
            return { 
                ...state,
                products: action.data 
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