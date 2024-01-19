import ReducerProps from '../../types/Utils/ReducerProps';
import * as constant from './constants';

export interface ProductState {
    loading: boolean,
    data: any[]
}

const initialState = {
    loading: true,
    data: [],
    error: '',
};

const settingsReducer = (history:any) => (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {
        case constant.FETCH_SETTINGS:
            return { 
                ...state,
                loading: true
            };
        case constant.FETCH_SETTINGS_SUCCESS:
            return { 
                ...state,
                loading: false,
                data: action.data 
            };
        case constant.FETCH_SETTINGS_FAILED:
            return { 
                ...state,
                error: action.error 
            };

        case constant.SAVE_SETTING_SUCCESS:
            return { 
                ...state,
                data: action.data
            };
        case constant.SAVE_SETTING_FAILED:
            return { 
                ...state,
                error: action.error 
            };
    

        default:
            return state;
    }
};

export default settingsReducer;