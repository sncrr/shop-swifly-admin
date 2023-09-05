import { Category } from '../../types/Inventory/Category';
import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

const initialState = {
    categories: [],
    selected: null,
    data: null,
    error: null,
};

const categoryReducer = (history:any) => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {
        case constant.FETCH_CATEGORIES:
            return { 
                ...state,
                error: null 
            };
        case constant.FETCH_CATEGORIES_SUCCESS:
            return { 
                ...state,
                categories: action.data 
            };
        case constant.FETCH_CATEGORIES_FAILED:
            return { 
                ...state,
                error: action.error 
            };
        
        case constant.SELECT_CATEGORY:
            return {
                ...state,
                selected: action.data
            }

        default:
            return state;
    }
};

export default categoryReducer;