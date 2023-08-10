import ReducerProps from '../../types/ReducerProps';
import * as constant from './constants';

const initialState = {
    toasts: new Array<any>()
};

const toastReducer = (state = initialState, action: ReducerProps) => {
    
    switch (action.type) {

        case constant.SHOW_TOAST:
            return { 
                ...state, 
                toasts: [...state.toasts, action.data]
            };
        
        case constant.UPDATE_TOAST:
            return { 
                ...state, 
                toasts: updateToasts(state.toasts, action.data.toastId, action.data.data)
            };

        case constant.HIDE_TOAST:
            return { 
                ...state, 
                toasts: hideToasts(state.toasts, action.data)
            };

        case constant.DESTROY_TOAST:
            return { 
                ...state, 
                toasts: filterToast(state.toasts, action.data)
            };

        default:
            return state;
    }
};

const updateToasts = (toasts:any[], toastId:string, data:any) => {
    return toasts.map((toast) => toast.toastId === toastId ? {
        ...toast,
        ...data
    }: toast)
}

const hideToasts = (toasts:any[], toastId:string) => {
    return toasts.map((toast) => toast.toastId === toastId ? {
        ...toast,
        toHide: true,
    }: toast)
}

const filterToast = (toasts:any[], toastId:string) => {
    return toasts.filter((toast) => toast.toastId !== toastId)
}


export default toastReducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     toasts: new Array<any>(),
// };

// const toastSlice = createSlice({
//     name: 'toast',
//     initialState,
//     reducers: {

//         addToast(state, action) {
            
//             state.toasts = [...state.toasts, action.payload];
//             return state;
//         },

//         removeToast(state, action) {
//             const id = action.payload;
//             state.toasts = state.toasts.filter(toast => toast.id !== id);
//             return state;
//         },

//     },
// });

// export const {
//     addToast,
//     removeToast
// } = toastSlice.actions;

// export default toastSlice.reducer;
