import * as constant from './constants';

const initialState = {
    loaderModal: false
};

const modalReducer = (state = initialState, action: any) => {
    
    switch (action.type) {
        case constant.SHOW_LOADER:
            return {
                ...state,
                loaderModal: true
            }
        case constant.HIDE_LOADER:
            return {
                ...state,
                loaderModal: false
            }
        default:
            return state;
    }
};

export default modalReducer;
