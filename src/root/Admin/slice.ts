import { createSlice } from '@reduxjs/toolkit';

export interface GlobalState {
    user: any,
    targetPath: string,
    navigateTo: boolean
}

const initialState = {
    user: null,
    targetPath: '/',
    navigateTo: false,
};

const globalSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUser: (state, action) => ({
            ...state,
            user: action.payload
        }),
        clearUser: (state) => ({
            ...state,
            user: null
        }),

        navigateTo: (state, action) => ({
            ...state,
            navigateTo: true,
            targetPath: action.payload
        }),
        navigateStop: (state) => ({
            ...state,
            navigate: '',
            navigateTo: false
        })

    },
});

export const {
    setUser,
    clearUser,

    navigateTo,
    navigateStop

} = globalSlice.actions;

export default globalSlice;
