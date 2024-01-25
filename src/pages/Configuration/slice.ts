import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
    loading: boolean,
    data: any[]
}

const initialState = {
    loading: true,
    data: [],
    error: ''
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {

        //Fetch
        fetchSettings: (state) => ({
            ...state,
            loading: true,
        }),
        fetchSettingsSuccess: (state, action) => ({
            ...state,
            loading: false,
            data: action.payload
        }),
        fetchSettingsFailed: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload
        }),
    }
})


export const {
    fetchSettings,
    fetchSettingsSuccess,
    fetchSettingsFailed,
} = settingSlice.actions

export default settingSlice;