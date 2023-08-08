import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: new Array<any>(),
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {

        addToast(state, action) {
            
            state.toasts = [...state.toasts, action.payload];
            return state;
        },

        removeToast(state, action) {
            const id = action.payload;
            state.toasts = state.toasts.filter(toast => toast.id !== id);
            return state;
        },

    },
});

export const {
    addToast,
    removeToast
} = toastSlice.actions;

export default toastSlice.reducer;
