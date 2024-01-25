import { createSlice } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_SUCCESS } from './constants';

// interface ActionProps {
//     type: string,
//     payload: {
//         toastId: string,
//         message: string,
//         type: 'success' | 'promise' | 'failed'
//     }
// }

const initialState = {
    toasts: new Array<any>()
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action) => ({
            ...state,
            toasts: [...state.toasts, action.payload]
        }),
        updateToast: (state, action) => ({
            ...state,
            toasts: updateToasts(
                state.toasts, 
                action.payload.toastId, 
                action.payload.data
            )
        }),
        hideToast: (state, action) => ({
            ...state,
            toasts: hideToasts(state.toasts, action.payload)
        }),
        destroyToast: (state, action) => ({
            ...state, 
            toasts: filterToast(state.toasts, action.payload)
        })
    }
})

const updateToasts = (toasts:any[], toastId:string, data:any) => {
    return toasts.map((toast) => toast.toastId === toastId ? {
        ...toast,
        ...data
    }: toast)
}

const hideToasts = (toasts:any[], toastId:string) => {
    return toasts.map((toast) => toast.toastId === toastId ? {
        ...toast,
        toShow: false,
        toHide: true,
    }: toast)
}

const filterToast = (toasts:any[], toastId:string) => {
    return toasts.filter((toast) => toast.toastId !== toastId)
}

export const createToast = (type: string, message: string) => {
    const toastId = new Date().getTime().toString();
    
    return { toastId, type, message, toShow: true, toHide: false }
}

export const successToast = (message: string) => {
    return createToast(STATUS_SUCCESS, message);
}

export const failedToast = (message: string) => {
    return createToast(STATUS_FAILED, message);
}

export const {
    showToast,
    hideToast,
    updateToast,
    destroyToast
} = toastSlice.actions

export const toastActions = {
    hideToast: 'toast/hideToast'
}

export default toastSlice;